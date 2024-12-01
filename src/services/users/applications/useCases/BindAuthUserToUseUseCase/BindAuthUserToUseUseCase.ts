import { UseCase } from "~/src/shared/core/applications/UseCase";
import { Injectable } from "@nestjs/common";
import { UpdateAuthUserUseCase } from "~/src/aggregates/authUsers/applications/useCases/UpdateAuthUserUseCase/UpdateAuthUserUseCase";
import { BindAuthUserToUseUseCaseRequest } from "~/src/services/users/applications/useCases/BindAuthUserToUseUseCase/dto/BindAuthUserToUseUseCase.request";
import { BindAuthUserToUseUseCaseResponse } from "~/src/services/users/applications/useCases/BindAuthUserToUseUseCase/dto/BindAuthUserToUseUseCase.response";
import { UpdateAuthUserUseCaseResponse } from "~/src/aggregates/authUsers/applications/useCases/UpdateAuthUserUseCase/dto/UpdateAuthUserUseCase.response";

@Injectable()
export class BindAuthUserToUseUseCase
  implements UseCase<BindAuthUserToUseUseCaseRequest, BindAuthUserToUseUseCaseResponse>
{
  constructor(private readonly updateAuthUserUseCase: UpdateAuthUserUseCase) {}

  async execute(request: BindAuthUserToUseUseCaseRequest): Promise<BindAuthUserToUseUseCaseResponse> {
    const { user, authUser } = request;
    authUser.bindUser(user.id.getNumber());
    const updateAuthUserResponse: UpdateAuthUserUseCaseResponse = await this.updateAuthUserUseCase.execute({
      toUpdateAuthUser: authUser,
    });
    if (!updateAuthUserResponse.ok) {
      return { ok: false, error: updateAuthUserResponse.error };
    }
    return { ok: true, user, authUser };
  }
}
