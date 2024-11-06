import { Inject, Injectable } from "@nestjs/common";
import { CreateUserUseCaseRequest } from "~/src/aggregates/users/applications/useCases/CreateUserUseCase/dto/CreateUser.request";
import { CreateUserUseCaseResponse } from "~/src/aggregates/users/applications/useCases/CreateUserUseCase/dto/CreateUser.response";
import { Users } from "~/src/aggregates/users/domain/Users";
import { USER_REPOSITORY, UsersRepositoryPort } from "~/src/aggregates/users/infrastructures/users.repository.port";
import { UseCase } from "~/src/shared/core/applications/UseCase";
import { Result } from "~/src/shared/core/domain/Result";

@Injectable()
export class CreateUserUseCase implements UseCase<CreateUserUseCaseRequest, CreateUserUseCaseResponse> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly usersRepository: UsersRepositoryPort,
  ) {}

  async execute(request: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const { nickname, authChannel } = request;
    const userOrError: Result<Users> = Users.createNew({ nickname, authChannel });
    if (userOrError.isFailure) {
      return {
        ok: false,
        error: userOrError.error,
      };
    }
    const user: Users = userOrError.value;
    const savedUser: Users = await this.usersRepository.create(user);
    return {
      ok: true,
      user: savedUser,
    };
  }
}
