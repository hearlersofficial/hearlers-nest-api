import { HttpStatus } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import {
  ReserveTokensCommand,
  ReserveTokensCommandResponse,
} from "~/src/aggregates/users/applications/commands/ReserveTokens/ReserveTokens.command";
import { FindOneUserUseCase } from "~/src/aggregates/users/applications/useCases/FindOneUserUseCase/FindOneUserUseCase";
import { UpdateUserUseCase } from "~/src/aggregates/users/applications/useCases/UpdateUserUseCase/UpdateUserUseCase";
import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";

@CommandHandler(ReserveTokensCommand)
export class ReserveTokensHandler implements ICommandHandler<ReserveTokensCommand, ReserveTokensCommandResponse> {
  constructor(
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  async execute(command: ReserveTokensCommand): Promise<ReserveTokensCommandResponse> {
    const { userId } = command.props;

    const findOneUserUseCaseResponse = await this.findOneUserUseCase.execute({ userId });
    if (!findOneUserUseCaseResponse.ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.NOT_FOUND, "사용자를 찾을 수 없습니다.");
    }
    const { user } = findOneUserUseCaseResponse;
    const userMessageToken = user.userMessageToken;
    if (!userMessageToken.hasRemainingTokens()) {
      throw new HttpStatusBasedRpcException(HttpStatus.FORBIDDEN, "잔여 토큰이 없습니다.");
    }

    if (userMessageToken.isReserved()) {
      throw new HttpStatusBasedRpcException(HttpStatus.CONFLICT, "이미 예약된 토큰이 있습니다.");
    }
    userMessageToken.reserveTokens();
    const updateUserUseCaseResponse = await this.updateUserUseCase.execute({ toUpdateUser: user });
    if (!updateUserUseCaseResponse.ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, "사용자 업데이트 실패");
    }
    return {
      remainingTokens: userMessageToken.remainingTokens,
      maxTokens: userMessageToken.maxTokens,
      reserved: userMessageToken.reserved,
    };
  }
}
