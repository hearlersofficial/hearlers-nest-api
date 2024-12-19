import { HttpStatus } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import {
  CheckRemainingTokensQuery,
  CheckRemainingTokensQueryResponse,
} from "~/src/aggregates/users/applications/queries/CheckRemainingTokens/CheckRemainingTokens.query";
import { FindOneUserUseCase } from "~/src/aggregates/users/applications/useCases/FindOneUserUseCase/FindOneUserUseCase";
import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";

@QueryHandler(CheckRemainingTokensQuery)
export class CheckRemainingTokensHandler
  implements IQueryHandler<CheckRemainingTokensQuery, CheckRemainingTokensQueryResponse>
{
  constructor(private readonly findOneUserUseCase: FindOneUserUseCase) {}

  async execute(query: CheckRemainingTokensQuery): Promise<CheckRemainingTokensQueryResponse> {
    const { userId } = query.props;
    const { ok, error, user } = await this.findOneUserUseCase.execute({ userId });
    if (!ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
    if (!user) {
      throw new HttpStatusBasedRpcException(HttpStatus.NOT_FOUND, "user not found");
    }

    return {
      remainingTokens: user.userMessageToken.remainingTokens,
      maxTokens: user.userMessageToken.maxTokens,
      reserved: user.userMessageToken.reserved,
    };
  }
}
