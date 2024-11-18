import { HttpStatus } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";
import { CreateCounselCommand, CreateCounselCommandResult } from "./CreateCounsel.command";
import { CreateCounselUseCase } from "~/src/aggregates/counsels/applications/useCases/CreateCounselUseCase/CreateCounselUseCase";
import { CreateCounselMessageUseCase } from "~/src/aggregates/counsels/applications/useCases/CreateCounselMessageUseCase/CreateCounselMessageUseCase";
import { GetCounselUseCase } from "../../useCases/GetCounselUseCase/GetCounselUseCase";

@CommandHandler(CreateCounselCommand)
export class CreateCounselHandler implements ICommandHandler<CreateCounselCommand> {
  constructor(
    private readonly createCounselUseCase: CreateCounselUseCase,
    private readonly createCounselMessageUseCase: CreateCounselMessageUseCase,
    private readonly getCounselUseCAse: GetCounselUseCase,
  ) {}

  async execute(command: CreateCounselCommand): Promise<CreateCounselCommandResult> {
    const { userId, counselorType } = command.props;

    // 상담 생성
    const createCounselResult = await this.createCounselUseCase.execute({ userId, counselorType });
    if (!createCounselResult.ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, createCounselResult.error);
    }
    const counsel = createCounselResult.counsel;

    // 첫 상담 메시지 생성 (버블을 통한 생성일 경우 분기 필요)
    const firstMessage = {
      counselId: counsel.id.getNumber(),
      message: "안녕! 여기는 내 상담실이야. 여기서는 무슨 이야기든 털어놓을 수 있어. 같이 이야기해볼래?",
      isUserMessage: false,
    };

    const createCounselMessgeResult = await this.createCounselMessageUseCase.execute(firstMessage);
    if (!createCounselMessgeResult.ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, createCounselMessgeResult.error);
    }
    const counselMessage = createCounselMessgeResult.counselMessage;

    const getCounselResult = await this.getCounselUseCAse.execute({ counselId: counsel.id.getNumber() });
    if (!getCounselResult.ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, getCounselResult.error);
    }

    const result = {
      counsel: getCounselResult.counsel,
      counselMessages: [counselMessage],
    };

    return result;
  }
}
