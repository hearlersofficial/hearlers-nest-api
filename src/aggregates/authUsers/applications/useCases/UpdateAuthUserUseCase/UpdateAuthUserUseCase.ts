import { Inject, Injectable } from "@nestjs/common";
import { UpdateAuthUserUseCaseRequest } from "~/src/aggregates/authUsers/applications/useCases/UpdateAuthUserUseCase/dto/UpdateAuthUserUseCase.request";
import { UpdateAuthUserUseCaseResponse } from "~/src/aggregates/authUsers/applications/useCases/UpdateAuthUserUseCase/dto/UpdateAuthUserUseCase.response";
import {
  AUTH_USERS_REPOSITORY,
  AuthUsersRepositoryPort,
} from "~/src/aggregates/authUsers/infrastructures/authUsers.repository.port";
import { UseCase } from "~/src/shared/core/applications/UseCase";

@Injectable()
export class UpdateAuthUserUseCase implements UseCase<UpdateAuthUserUseCaseRequest, UpdateAuthUserUseCaseResponse> {
  constructor(
    @Inject(AUTH_USERS_REPOSITORY)
    private readonly authUserRepository: AuthUsersRepositoryPort,
  ) {}

  async execute(request: UpdateAuthUserUseCaseRequest): Promise<UpdateAuthUserUseCaseResponse> {
    const { toUpdateAuthUser } = request;
    const updatedAuthUser = await this.authUserRepository.update(toUpdateAuthUser);
    return { ok: true, authUser: updatedAuthUser };
  }
}
