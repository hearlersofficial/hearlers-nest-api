import { Inject, Injectable } from "@nestjs/common";
import { CreateAuthUserUseCaseRequest } from "~/src/aggregates/authUsers/applications/useCases/CreateAuthUserUseCase/dto/CreateAuthUserUseCase.request";
import { CreateAuthUserUseCaseResponse } from "~/src/aggregates/authUsers/applications/useCases/CreateAuthUserUseCase/dto/CreateAuthUserUseCase.response";
import { AuthUsers } from "~/src/aggregates/authUsers/domain/AuthUsers";
import {
  AUTH_USERS_REPOSITORY,
  AuthUsersRepositoryPort,
} from "~/src/aggregates/authUsers/infrastructures/authUsers.repository.port";
import { UseCase } from "~/src/shared/core/applications/UseCase";

@Injectable()
export class CreateAuthUserUseCase implements UseCase<CreateAuthUserUseCaseRequest, CreateAuthUserUseCaseResponse> {
  constructor(
    @Inject(AUTH_USERS_REPOSITORY)
    private readonly authUserRepository: AuthUsersRepositoryPort,
  ) {}

  async execute(): Promise<CreateAuthUserUseCaseResponse> {
    const authUserResult = AuthUsers.createNew({});
    if (authUserResult.isFailure) {
      return { ok: false, error: authUserResult.error };
    }

    const savedAuthUser = await this.authUserRepository.create(authUserResult.value);
    return { ok: true, authUser: savedAuthUser };
  }
}
