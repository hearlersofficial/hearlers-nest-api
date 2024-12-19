import { HttpStatus, Injectable } from "@nestjs/common";
import { UseCase } from "~/src/shared/core/applications/UseCase";
import { ConnectAuthChannelUseCaseRequest } from "~/src/services/users/applications/useCases/ConnectAuthChannelUseCase/dto/ConnectAuthChannelUseCase.request";
import { ConnectAuthChannelUseCaseResponse } from "~/src/services/users/applications/useCases/ConnectAuthChannelUseCase/dto/ConnectAuthChannelUseCase.response";
import { UpdateAuthUserUseCase } from "~/src/aggregates/authUsers/applications/useCases/UpdateAuthUserUseCase/UpdateAuthUserUseCase";
import { FindOneAuthUserUseCase } from "~/src/aggregates/authUsers/applications/useCases/FindOneAuthUserUseCase/FindOneAuthUserUseCase";
import { FindOneAuthUserUseCaseResponse } from "~/src/aggregates/authUsers/applications/useCases/FindOneAuthUserUseCase/dto/FindOneAuthUserUseCase.response";
import { UpdateAuthUserUseCaseResponse } from "~/src/aggregates/authUsers/applications/useCases/UpdateAuthUserUseCase/dto/UpdateAuthUserUseCase.response";
import { UpdateUserUseCase } from "~/src/aggregates/users/applications/useCases/UpdateUserUseCase/UpdateUserUseCase";
import { FindOneUserUseCase } from "~/src/aggregates/users/applications/useCases/FindOneUserUseCase/FindOneUserUseCase";
import { FindOneUserUseCaseResponse } from "~/src/aggregates/users/applications/useCases/FindOneUserUseCase/dto/FindOneUserUseCase.response";
import { Users } from "~/src/aggregates/users/domain/Users";
import { AuthUsers } from "~/src/aggregates/authUsers/domain/AuthUsers";
import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";
import { UpdateUserUseCaseResponse } from "~/src/aggregates/users/applications/useCases/UpdateUserUseCase/dto/UpdateUserUseCase.response";

@Injectable()
export class ConnectAuthChannelUseCase
  implements UseCase<ConnectAuthChannelUseCaseRequest, ConnectAuthChannelUseCaseResponse>
{
  constructor(
    private readonly updateAuthUserUseCase: UpdateAuthUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly findOneAuthUserUseCase: FindOneAuthUserUseCase,
    private readonly findOneUserUseCase: FindOneUserUseCase,
  ) {}

  async execute(request: ConnectAuthChannelUseCaseRequest): Promise<ConnectAuthChannelUseCaseResponse> {
    const { userId, channelInfo } = request;

    const { authUser, user } = await this.getUserAndAuthUser(userId);
    authUser.connectAuthChannel(channelInfo.authChannel, channelInfo.uniqueId);
    user.userMessageToken.updateMaxTokens(1000);

    const updateAuthUserResponse: UpdateAuthUserUseCaseResponse = await this.updateAuthUserUseCase.execute({
      toUpdateAuthUser: authUser,
    });
    if (!updateAuthUserResponse.ok) {
      return {
        ok: false,
        error: updateAuthUserResponse.error,
      };
    }
    const updateUserResponse: UpdateUserUseCaseResponse = await this.updateUserUseCase.execute({
      toUpdateUser: user,
    });
    if (!updateUserResponse.ok) {
      return {
        ok: false,
        error: updateUserResponse.error,
      };
    }
    return { ok: true, authUser };
  }

  private async getUserAndAuthUser(userId: number): Promise<{ user: Users; authUser: AuthUsers }> {
    const findOneAuthUserResponse: FindOneAuthUserUseCaseResponse = await this.findOneAuthUserUseCase.execute({
      userId,
    });
    if (!findOneAuthUserResponse.ok || !findOneAuthUserResponse.authUser) {
      throw new HttpStatusBasedRpcException(HttpStatus.NOT_FOUND, "Auth user not found");
    }
    const authUser = findOneAuthUserResponse.authUser;

    const findOneUserResponse: FindOneUserUseCaseResponse = await this.findOneUserUseCase.execute({
      userId,
    });
    if (!findOneUserResponse.ok || !findOneUserResponse.user) {
      throw new HttpStatusBasedRpcException(HttpStatus.NOT_FOUND, "User not found");
    }
    const user = findOneUserResponse.user;

    return { user, authUser };
  }
}
