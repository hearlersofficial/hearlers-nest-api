import { HttpStatus } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";
import { CreateCounselCommand, CreateCounselCommandResult } from "./CreateCounsel.command";
import { InitializeCounselUseCase } from "../../useCases/InitializeCounselUseCase/InitializeCounselUseCase";

@CommandHandler(CreateCounselCommand)
export class CreateCounselHandler implements ICommandHandler<CreateCounselCommand> {
  constructor(private readonly inializeCounselUseCase: InitializeCounselUseCase) {}

  async execute(command: CreateCounselCommand): Promise<CreateCounselCommandResult> {
    const { userId, counselorId } = command.props;

    const initializeCounselResult = await this.inializeCounselUseCase.execute({ userId, counselorId });
    if (!initializeCounselResult.ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, initializeCounselResult.error);
    }

    const { counsel, counselMessages } = initializeCounselResult;
    const result: CreateCounselCommandResult = { counsel, counselMessages };

    return result;
  }
}
