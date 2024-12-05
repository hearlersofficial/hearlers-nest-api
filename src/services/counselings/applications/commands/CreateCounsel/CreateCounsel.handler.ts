import { HttpStatus } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";
import { CreateCounselCommand, CreateCounselCommandResult } from "./CreateCounsel.command";
import { InitializeCounselUseCase } from "../../useCases/InitializeCounselUseCase/InitializeCounselUseCase";
import { InitializeCounselWithBubbleUseCase } from "../../useCases/InitializeCounselWithBubbleUseCase/InitializeCounselWithBubbleUseCase";

@CommandHandler(CreateCounselCommand)
export class CreateCounselHandler implements ICommandHandler<CreateCounselCommand> {
  constructor(
    private readonly inializeCounselUseCase: InitializeCounselUseCase,
    private readonly initializeCounselWithBubbleUseCase: InitializeCounselWithBubbleUseCase,
  ) {}

  async execute(command: CreateCounselCommand): Promise<CreateCounselCommandResult> {
    const { userId, counselorId, introMessage, responseMessage } = command.props;
    const withBubble: boolean = introMessage && responseMessage ? true : false;
    let result: CreateCounselCommandResult;

    if (withBubble) {
      const initializeCounselWithBubbleResult = await this.initializeCounselWithBubbleUseCase.execute({
        userId,
        counselorId,
        introMessage,
        responseMessage,
      });
      if (!initializeCounselWithBubbleResult.ok) {
        throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, initializeCounselWithBubbleResult.error);
      }

      const { counsel, counselMessages } = initializeCounselWithBubbleResult;
      result = { counsel, counselMessages };
    } else {
      const initializeCounselResult = await this.inializeCounselUseCase.execute({ userId, counselorId });
      if (!initializeCounselResult.ok) {
        throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, initializeCounselResult.error);
      }

      const { counsel, counselMessages } = initializeCounselResult;
      result = { counsel, counselMessages };
    }

    return result;
  }
}
