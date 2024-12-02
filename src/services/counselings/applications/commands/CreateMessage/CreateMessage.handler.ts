import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateMessageCommand } from "./CreateMessage.command";
import { GetCounselUseCase } from "~/src/aggregates/counsels/applications/useCases/GetCounselUseCase/GetCounselUseCase";
import { GetCounselPromptByTypeUseCase } from "~/src/aggregates/counselPrompts/applications/useCases/GetCounselPromptByTypeUseCase/GetCounselPromptByTypeUseCase";
import { CreateCounselMessageUseCase } from "~/src/aggregates/counselMessages/applications/useCases/CreateCounselMessageUseCase/CreateCounselMessageUseCase";
import { GetCounselMessageListUseCase } from "~/src/aggregates/counselMessages/applications/useCases/GetCounselMessageListUseCase/GetCounselMessageListUseCase";
import { UpdateCounselUseCase } from "~/src/aggregates/counsels/applications/useCases/UpdateCounselUseCase/UpdateCounselUseCase";
import { GenerateGptResponseUseCase } from "../../useCases/GenerateGptResponseUseCase/GenerateGptResponseUseCase";
import { BranchCounselStageUseCase } from "../../useCases/BranchCounselStageUseCase/BranchCounselStageUseCase";
import { CounselMessages } from "~/src/aggregates/counselMessages/domain/CounselMessages";
import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";
import { HttpStatus } from "@nestjs/common";
import { CounselStage } from "~/src/shared/enums/CounselStage.enum";
import { ChatCompletionMessageParam } from "openai/resources";
import { CounselorInfo, CounselorType } from "~/src/shared/enums/CounselorType.enum";
import { CounselPrompt } from "~/src/shared/enums/CounselPrompt.enum";
import { getNowDayjs } from "~/src/shared/utils/Date.utils";
import { Counsels } from "~/src/aggregates/counsels/domain/Counsels";

@CommandHandler(CreateMessageCommand)
export class CreateMessageHandler implements ICommandHandler<CreateMessageCommand> {
  constructor(
    private readonly getCounselUseCase: GetCounselUseCase,
    private readonly getCounselPromptByTypeUseCase: GetCounselPromptByTypeUseCase,
    private readonly createCounselMessageUseCase: CreateCounselMessageUseCase,
    private readonly getCounselMessageListUseCase: GetCounselMessageListUseCase,
    private readonly updateCounselUseCase: UpdateCounselUseCase,
    private readonly generateGptResponseUseCase: GenerateGptResponseUseCase,
    private readonly branchCounselStageUseCase: BranchCounselStageUseCase,
  ) {}

  async execute(command: CreateMessageCommand): Promise<CounselMessages> {
    const { counselId, message } = command.props;

    // 상담 정보 가져오기
    const getCounselResult = await this.getCounselUseCase.execute({ counselId });
    if (!getCounselResult.ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, getCounselResult.error);
    }
    const counsel = getCounselResult.counsel;

    // 상담 단계 초기화여부 체크
    if (this.checkNeedStageReset(counsel)) {
      counsel.updateCounselStage(CounselStage.SMALL_TALK);
    }

    // 극단적 상태 체크
    if (this.checkExtreme(message)) {
      counsel.updateCounselStage(CounselStage.EXTREME);
    }

    const counselorType = counsel.counselorType;
    const stage = counsel.counselStage;

    // 시스템 프롬프트 가져오기
    // 유저 정보 가져와 집어넣는 로직 필요(프롬프트에서 사용하는 유저 정보 구체화 필요)
    const prompts: ChatCompletionMessageParam[] = [];
    const systemPrompt = this.decideSystemPrompt(counselorType, stage);
    const getPromptResult = await this.getCounselPromptByTypeUseCase.execute({ promptType: systemPrompt });
    if (!getPromptResult.ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, getPromptResult.error);
    }
    const counselPrompt = getPromptResult.counselPrompt;
    prompts.push(counselPrompt.makePrompt(counselorType));

    // 사용자 메시지 추가
    const createUserMessageResult = await this.createCounselMessageUseCase.execute({
      counselId,
      message,
      isUserMessage: true,
    });
    if (!createUserMessageResult.ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, createUserMessageResult.error);
    }

    // 이전 대화 가져오기 (유저의 대화만 가져오는지 시스템 응답도 포함하는지 확인 필요)
    const getMessageListResult = await this.getCounselMessageListUseCase.execute({ counselId });
    if (!getMessageListResult.ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, getMessageListResult.error);
    }
    const messageList = getMessageListResult.counselMessageList;
    messageList.forEach((message) => {
      prompts.push(message.makePrompt());
    });

    // 응답 생성
    const generateGptResponseResult = await this.generateGptResponseUseCase.execute({ prompts });
    if (!generateGptResponseResult.ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, generateGptResponseResult.error);
    }
    const response = generateGptResponseResult.response;

    // 시스템 메시지 추가
    const createSystemMessageResult = await this.createCounselMessageUseCase.execute({
      counselId,
      message: response,
      isUserMessage: false,
    });
    if (!createSystemMessageResult.ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, createSystemMessageResult.error);
    }
    const systemMessage = createSystemMessageResult.counselMessage;

    // 프롬프트 분기(SMALL_TALK  단계에서만 이루어지는지 확인 필요)
    if (this.checkNeedBranch(stage, response)) {
      const branchCounselStageResult = await this.branchCounselStageUseCase.execute({ prompts: prompts.slice(1) });
      if (!branchCounselStageResult.ok) {
        throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, branchCounselStageResult.error);
      }
      const branchedStage = branchCounselStageResult.branchedStage;
      counsel.updateCounselStage(branchedStage);
    }

    // last message 저장 및 상담 정보 업데이트
    counsel.saveLastMessage(systemMessage);
    const updateCounselResult = await this.updateCounselUseCase.execute({ toUpdateCounsel: counsel });
    if (!updateCounselResult.ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, updateCounselResult.error);
    }

    return systemMessage;
  }

  private decideSystemPrompt(counselorType: CounselorType, stage: CounselStage): CounselPrompt {
    if (stage == CounselStage.SMALL_TALK) {
      return CounselPrompt.SYSTEM_MSG;
    }
    if (stage == CounselStage.POSITIVE) {
      return CounselPrompt.POSITIVE_MSG;
    }
    const type = CounselorInfo[counselorType].type;
    if (stage == CounselStage.NEGATIVE_WITH_REASON) {
      if (type == "우울") {
        return CounselPrompt.DEPRESSED_REASON_MSG;
      }
      if (type == "불안") {
        return CounselPrompt.ANXIOUS_REASON_MSG;
      }
      if (type == "무기력") {
        return CounselPrompt.TIRED_REASON_MSG;
      }
    }
    if (stage == CounselStage.NEGATIVE_WITHOUT_REASON) {
      if (type == "우울") {
        return CounselPrompt.DEPRESSED_NO_REASON_MSG;
      }
      if (type == "불안") {
        return CounselPrompt.ANXIOUS_NO_REASON_MSG;
      }
      if (type == "무기력") {
        return CounselPrompt.TIRED_NO_REASON_MSG;
      }
    }
    if (stage == CounselStage.EXTREME) {
      return CounselPrompt.WHY_LIVE_MSG;
    }
  }

  private checkExtreme(message: string): boolean {
    return message.includes("왜 사는지");
  }

  private checkNeedBranch(stage: CounselStage, response: string): boolean {
    const end_msg = "같이 더 이야기해보자.";
    return stage == CounselStage.SMALL_TALK && response.includes(end_msg);
  }

  private checkNeedStageReset(counsel: Counsels): boolean {
    const lastChatedAt = counsel.lastChatedAt;
    const now = getNowDayjs();

    return now.isAfter(lastChatedAt.add(6, "hour"));
  }
}
