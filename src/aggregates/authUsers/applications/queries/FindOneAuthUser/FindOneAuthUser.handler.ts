import { HttpStatus } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import {
  FindOneAuthUserQuery,
  FindOneAuthUserQueryResult,
} from "~/src/aggregates/authUsers/applications/queries/FindOneAuthUser/FindOneAuthUser.query";
import { FindOneAuthUserUseCase } from "~/src/aggregates/authUsers/applications/useCases/FindOneAuthUserUseCase/FindOneAuthUserUseCase";
import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";

@QueryHandler(FindOneAuthUserQuery)
export class FindOneAuthUserHandler implements IQueryHandler<FindOneAuthUserQuery, FindOneAuthUserQueryResult> {
  constructor(private readonly findOneAuthUserUseCase: FindOneAuthUserUseCase) {}

  async execute(query: FindOneAuthUserQuery): Promise<FindOneAuthUserQueryResult> {
    const { ok, error, authUser } = await this.findOneAuthUserUseCase.execute(query.props);
    if (!ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.NOT_FOUND, error);
    }
    return { authUser };
  }
}
