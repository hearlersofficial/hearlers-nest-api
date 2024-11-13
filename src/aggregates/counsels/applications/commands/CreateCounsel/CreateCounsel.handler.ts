import { HttpStatus } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";
import { CreateCounselCommand } from "./CreateCounsel.command";
import { Counsels } from "~/src/aggregates/counsels/domain/Counsels";
import { CreateCounselUseCase } from "~/src/aggregates/counsels/applications/useCases/CreateCounselUseCase/CreateCounselUseCase";
import { CreateCounselMessageUseCase } from "~/src/aggregates/counsels/applications/useCases/CreateCounselMessageUseCase/CreateCounselMessageUseCase";

@CommandHandler(CreateCounselCommand)
export class CreateCounselHandler implements ICommandHandler<CreateCounselCommand> {
  constructor(
    private readonly createCounselUseCase: CreateCounselUseCase,
    private readonly createCounselMessageUseCase: CreateCounselMessageUseCase,
  ) {}

  async execute(command: CreateCounselCommand): Promise<Counsels> {
    const { userId, counselorType } = command.props;

    // To-do userId 검증 로직

    // 상담 생성
    const createCounselResult = await this.createCounselUseCase.execute({ userId, counselorType });
    if (!createCounselResult.ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, createCounselResult.error);
    }
    const counsel = createCounselResult.counsel;

    // 첫 상담 메시지 생성
    const firstMessage = {
      counselId: createCounselResult.counsel.id.getNumber(),
      message: "안녕! 여기는 내 상담실이야. 여기서는 무슨 이야기든 털어놓을 수 있어. 같이 이야기해볼래?",
      isUserMessage: false,
    };

    const createCounselMessgeResult = await this.createCounselMessageUseCase.execute(firstMessage);
    if (!createCounselMessgeResult.ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, createCounselMessgeResult.error);
    }
    const counselMessage = createCounselMessgeResult.counselMessage;

    counsel.addMessage(counselMessage);

    return counsel;
  }
}
