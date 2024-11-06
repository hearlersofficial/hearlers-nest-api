import { HttpStatus } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { CreateUserCommand } from "~/src/aggregates/users/applications/commands/CreateUser/CreateUser.command";
import { CreateUserUseCase } from "~/src/aggregates/users/applications/useCases/CreateUserUseCase/CreateUserUseCase";
import { FindOneUserUseCase } from "~/src/aggregates/users/applications/useCases/FindOneUserUseCase/FindOneUserUseCase";
import { Users } from "~/src/aggregates/users/domain/Users";
import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  async execute(command: CreateUserCommand): Promise<Users> {
    const { nickname, authChannel } = command.props;
    const existingUser = await this.findOneUserUseCase.execute({ nickname });
    if (!existingUser.ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, existingUser.error);
    }
    if (existingUser.user) {
      throw new HttpStatusBasedRpcException(HttpStatus.CONFLICT, "이미 존재하는 사용자입니다.");
    }
    const { ok, error, user } = await this.createUserUseCase.execute({ nickname, authChannel });
    if (!ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
    return user;
  }
}
