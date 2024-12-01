import { HttpStatus } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { VerifyRefreshTokenCommand } from "~/src/aggregates/authUsers/applications/commands/VerifyRefreshToken/VerifyRefreshToken.command";
import { VerifyRefreshTokenResult } from "~/src/aggregates/authUsers/applications/commands/VerifyRefreshToken/VerifyRefreshToken.command";
import { FindOneAuthUserUseCaseResponse } from "~/src/aggregates/authUsers/applications/useCases/FindOneAuthUserUseCase/dto/FindOneAuthUserUseCase.response";
import { FindOneAuthUserUseCase } from "~/src/aggregates/authUsers/applications/useCases/FindOneAuthUserUseCase/FindOneAuthUserUseCase";
import { UpdateAuthUserUseCaseResponse } from "~/src/aggregates/authUsers/applications/useCases/UpdateAuthUserUseCase/dto/UpdateAuthUserUseCase.response";
import { UpdateAuthUserUseCase } from "~/src/aggregates/authUsers/applications/useCases/UpdateAuthUserUseCase/UpdateAuthUserUseCase";
import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";

@CommandHandler(VerifyRefreshTokenCommand)
export class VerifyRefreshTokenHandler implements ICommandHandler<VerifyRefreshTokenCommand, VerifyRefreshTokenResult> {
  constructor(
    private readonly findOneAuthUserUseCase: FindOneAuthUserUseCase,
    private readonly updateAuthUserUseCase: UpdateAuthUserUseCase,
  ) {}

  async execute(command: VerifyRefreshTokenCommand): Promise<VerifyRefreshTokenResult> {
    const { userId, token } = command.props;
    const findOneAuthUserUseCaseResponse: FindOneAuthUserUseCaseResponse = await this.findOneAuthUserUseCase.execute({
      userId,
    });
    if (!findOneAuthUserUseCaseResponse.authUser) {
      throw new HttpStatusBasedRpcException(HttpStatus.NOT_FOUND, "authUser not found");
    }
    const { authUser } = findOneAuthUserUseCaseResponse;
    const isRefreshTokenVerified = authUser.verifyRefreshToken(token);
    if (isRefreshTokenVerified.isFailure) {
      return {
        success: false,
      };
    }
    const updateAuthUserUseCaseResponse: UpdateAuthUserUseCaseResponse = await this.updateAuthUserUseCase.execute({
      toUpdateAuthUser: authUser,
    });
    if (!updateAuthUserUseCaseResponse.ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, "failed to update auth user");
    }
    return {
      success: true,
    };
  }
}
