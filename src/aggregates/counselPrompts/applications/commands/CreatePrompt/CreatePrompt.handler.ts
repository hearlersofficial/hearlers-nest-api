import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreatePromptCommand } from "./CreatePrompt.command";
import { CreateCounselPromptUseCase } from "../../useCases/CreateCounselPromptUseCase/CreateCounselPromptUseCase";
import { CounselPrompts } from "../../../domain/CounselPrompts";
import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";
import { HttpStatus } from "@nestjs/common";

@CommandHandler(CreatePromptCommand)
export class CreatePromptHandler implements ICommandHandler<CreatePromptCommand> {
  constructor(private readonly createCounselPromptUseCase: CreateCounselPromptUseCase) {}

  async execute(command: CreatePromptCommand): Promise<CounselPrompts> {
    const { props } = command;

    const createCounselPromptResult = await this.createCounselPromptUseCase.execute(props);
    if (!createCounselPromptResult.ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, createCounselPromptResult.error);
    }

    return createCounselPromptResult.counselPrompt;
  }
}
