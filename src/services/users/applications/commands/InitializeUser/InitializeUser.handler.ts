import { HttpStatus } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateAuthUserUseCase } from "~/src/aggregates/authUsers/applications/useCases/CreateAuthUserUseCase/CreateAuthUserUseCase";
import { AuthUsers } from "~/src/aggregates/authUsers/domain/AuthUsers";
import { CreateUserUseCase } from "~/src/aggregates/users/applications/useCases/CreateUserUseCase/CreateUserUseCase";
import { CreateUserUseCaseResponse } from "~/src/aggregates/users/applications/useCases/CreateUserUseCase/dto/CreateUser.response";
import { Users } from "~/src/aggregates/users/domain/Users";
import { InitializeUserCommand } from "~/src/services/users/applications/commands/InitializeUser/InitializeUser.command";
import { BindAuthUserToUseUseCase } from "~/src/services/users/applications/useCases/BindAuthUserToUseUseCase/BindAuthUserToUseUseCase";
import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";

@CommandHandler(InitializeUserCommand)
export class InitializeUserHandler implements ICommandHandler<InitializeUserCommand> {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly createAuthUserUseCase: CreateAuthUserUseCase,
    private readonly bindAuthUserUseCase: BindAuthUserToUseUseCase,
  ) {}

  async execute(): Promise<{ user: Users; authUser: AuthUsers }> {
    const createUserUseCaseResponse: CreateUserUseCaseResponse = await this.createUserUseCase.execute();
    if (!createUserUseCaseResponse.ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, createUserUseCaseResponse.error);
    }
    const user: Users = createUserUseCaseResponse.user;
    const createAuthUserUseCaseResponse = await this.createAuthUserUseCase.execute();
    if (!createAuthUserUseCaseResponse.ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, createAuthUserUseCaseResponse.error);
    }
    const authUser: AuthUsers = createAuthUserUseCaseResponse.authUser;
    const bindAuthUserUseCaseResponse = await this.bindAuthUserUseCase.execute({
      user,
      authUser,
    });
    if (!bindAuthUserUseCaseResponse.ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, bindAuthUserUseCaseResponse.error);
    }
    return { user, authUser };
  }
}
