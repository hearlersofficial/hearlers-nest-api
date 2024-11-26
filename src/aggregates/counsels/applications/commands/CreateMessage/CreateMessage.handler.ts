import { HttpStatus } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import OpenAI from "openai";

import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";
import { CreateCounselMessageUseCase } from "~/src/aggregates/counsels/applications/useCases/CreateCounselMessageUseCase/CreateCounselMessageUseCase";
import { GetCounselUseCase } from "../../useCases/GetCounselUseCase/GetCounselUseCase";
import { CreateMessageCommand } from "./CreateMessage.command";
import { CounselMessages } from "../../../domain/CounselMessages";
import { ChatCompletionMessageParam } from "openai/resources";
import { GetCounselPromptUseCase } from "../../useCases/GetCounselPromptUseCase/GetCounselPromptUseCase";
import { CounselorInfo, CounselorType } from "~/src/shared/enums/CounselorType.enum";
import { CounselPrompt } from "~/src/shared/enums/CounselPrompt.enum";
import { GetCounselMessageListUseCase } from "../../useCases/GetCounselMessageListUseCase/GetCounselMessageListUseCase";
import { CounselStage } from "~/src/shared/enums/CounselStage.enum";
import { UpdateCounselUseCase } from "../../useCases/UpdateCounselUseCase/UpdateCounselUseCase";

@CommandHandler(CreateMessageCommand)
export class CreateMessageHandler implements ICommandHandler<CreateMessageCommand> {
  private openai: OpenAI;

  constructor(
    private readonly getCounselUseCase: GetCounselUseCase,
    private readonly getCounselPromptUseCase: GetCounselPromptUseCase,
    private readonly createCounselMessageUseCase: CreateCounselMessageUseCase,
    private readonly getCounselMessageListUseCase: GetCounselMessageListUseCase,
    private readonly updateCounselUseCase: UpdateCounselUseCase,
  ) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || "",
    });
  }

  async execute(command: CreateMessageCommand): Promise<CounselMessages> {
    const { counselId, message } = command.props;

    // 상담 정보 가져오기
    const getCounselResult = await this.getCounselUseCase.execute({ counselId });
    if (!getCounselResult.ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, getCounselResult.error);
    }
    const counsel = getCounselResult.counsel;

    //극단적 상태 체크
    if (this.checkExtreme(message)) {
      counsel.updateCounselStage(CounselStage.EXTREME);
      const updateCounselResult = await this.updateCounselUseCase.execute({ toUpdateCounsel: counsel });
      if (!updateCounselResult.ok) {
        throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, updateCounselResult.error);
      }
    }

    const counselorType = counsel.counselorType;
    const stage = counsel.counselStage;

    // 시스템 프롬프트 가져오기
    // 유저 정보 가져와 집어넣는 로직 필요(프롬프트에서 사용하는 유저 정보 구체화 필요)
    const prompts: ChatCompletionMessageParam[] = [];
    const systemPrompt = this.decideSystemPrompt(counselorType, stage);
    const getPromptResult = await this.getCounselPromptUseCase.execute({ promptType: systemPrompt });
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
    // 비로그인 유저일 경우 횟수제한 로직 추가
    const getMessageListResult = await this.getCounselMessageListUseCase.execute({ counselId });
    if (!getMessageListResult.ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, getMessageListResult.error);
    }
    const messageList = getMessageListResult.counselMessageList;
    messageList.forEach((message) => {
      prompts.push(message.makePrompt());
    });

    // 응답 생성
    const completion = await this.openai.chat.completions.create({
      model: "gpt-4o",
      messages: prompts,
      temperature: 1,
    });
    const response = completion?.choices[0]?.message?.content;
    if (!response) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, "응답 생성에 실패했습니다.");
    }
    const createSystemMessageResult = await this.createCounselMessageUseCase.execute({
      counselId,
      message: response,
      isUserMessage: false,
    });
    if (!createSystemMessageResult.ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, createSystemMessageResult.error);
    }
    const systemMessage = createSystemMessageResult.counselMessage;

    // 상담 정보 업데이트(SMALL_TALK  단계에서만 이루어지는지 확인 필요)
    if (this.checkNeedBranch(stage, response)) {
      const branchCompletion = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: this.BRANCH_MSG,
          },
          {
            role: "user",
            content: JSON.stringify(prompts.slice(1)),
          },
        ],
        temperature: 0,
      });
      const branch = branchCompletion?.choices[0]?.message?.content;
      let updatedStage: CounselStage = null;
      if (branch) {
        if (branch.includes("1")) {
          updatedStage = CounselStage.POSITIVE;
        } else if (branch.includes("2")) {
          updatedStage = CounselStage.NEGATIVE_WITH_REASON;
        } else if (branch.includes("3")) {
          updatedStage = CounselStage.NEGATIVE_WITHOUT_REASON;
        }
      }
      if (updatedStage == null) {
        updatedStage = CounselStage.POSITIVE;
      }
      counsel.updateCounselStage(updatedStage);
      const updateCounselResult = await this.updateCounselUseCase.execute({ toUpdateCounsel: counsel });
      if (!updateCounselResult.ok) {
        throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, updateCounselResult.error);
      }
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

  private BRANCH_MSG = `
<Task>
    Analyze the whole conversation and answer 1, 2, or 3.
    If the 나's feeling is positive, answer 1. If negative, proceed to the next step.
    If there is a clear reason for the negative feeling, answer 2. If there is no reason, answer 3.
    else, answer 4.
</Task>
`;
}
