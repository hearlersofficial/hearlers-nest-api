import { HttpStatus } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { UpdateUserCommand } from "~/src/aggregates/users/applications/commands/UpdateUser/UpdateUser.command";
import { UpdateUserUseCase } from "~/src/aggregates/users/applications/useCases/UpdateUserUseCase/UpdateUserUseCase";
import { Users } from "~/src/aggregates/users/domain/Users";
import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}

  async execute(command: UpdateUserCommand): Promise<Users> {
    const { userId, nickname, authChannel, uniqueId } = command.props;

    const { ok, error, user } = await this.updateUserUseCase.execute({ userId, nickname, authChannel, uniqueId });
    if (!ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
    return user;
  }
}
