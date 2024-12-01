import { Injectable } from "@nestjs/common";
import { UseCase } from "~/src/shared/core/applications/UseCase";
import { ConnectAuthChannelUseCaseRequest } from "~/src/services/users/applications/useCases/ConnectAuthChannelUseCase/dto/ConnectAuthChannelUseCase.request";
import { ConnectAuthChannelUseCaseResponse } from "~/src/services/users/applications/useCases/ConnectAuthChannelUseCase/dto/ConnectAuthChannelUseCase.response";
import { UpdateAuthUserUseCase } from "~/src/aggregates/authUsers/applications/useCases/UpdateAuthUserUseCase/UpdateAuthUserUseCase";
import { FindOneAuthUserUseCase } from "~/src/aggregates/authUsers/applications/useCases/FindOneAuthUserUseCase/FindOneAuthUserUseCase";
import { FindOneAuthUserUseCaseResponse } from "~/src/aggregates/authUsers/applications/useCases/FindOneAuthUserUseCase/dto/FindOneAuthUserUseCase.response";
import { UpdateAuthUserUseCaseResponse } from "~/src/aggregates/authUsers/applications/useCases/UpdateAuthUserUseCase/dto/UpdateAuthUserUseCase.response";

@Injectable()
export class ConnectAuthChannelUseCase
  implements UseCase<ConnectAuthChannelUseCaseRequest, ConnectAuthChannelUseCaseResponse>
{
  constructor(
    private readonly updateAuthUserUseCase: UpdateAuthUserUseCase,
    private readonly findOneAuthUserUseCase: FindOneAuthUserUseCase,
  ) {}

  async execute(request: ConnectAuthChannelUseCaseRequest): Promise<ConnectAuthChannelUseCaseResponse> {
    const { userId, channelInfo } = request;
    const findOneAuthUserResponse: FindOneAuthUserUseCaseResponse = await this.findOneAuthUserUseCase.execute({
      userId,
      channelInfo,
    });
    if (!findOneAuthUserResponse.ok || !findOneAuthUserResponse.authUser) {
      return { ok: false, error: "Auth user not found" };
    }
    const authUser = findOneAuthUserResponse.authUser;
    authUser.connectAuthChannel(request.channelInfo.authChannel, request.channelInfo.uniqueId);

    const updateAuthUserResponse: UpdateAuthUserUseCaseResponse = await this.updateAuthUserUseCase.execute({
      toUpdateAuthUser: authUser,
    });
    if (!updateAuthUserResponse.ok) {
      return {
        ok: false,
        error: updateAuthUserResponse.error,
      };
    }
    return { ok: true, authUser };
  }
}
