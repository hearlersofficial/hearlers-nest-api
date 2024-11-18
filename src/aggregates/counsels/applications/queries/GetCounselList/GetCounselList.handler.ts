import { HttpStatus } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetCounselListQuery } from "~/src/aggregates/counsels/applications/queries/GetCounselList/GetCounselList.query";
import { GetCounselListUseCase } from "~/src/aggregates/counsels/applications/useCases/GetCounselListUseCase/GetCounselListUseCase";
import { Counsels } from "~/src/aggregates/counsels/domain/Counsels";
import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";

@QueryHandler(GetCounselListQuery)
export class GetCounselListHandler implements IQueryHandler<GetCounselListQuery> {
  constructor(private readonly getCounsleListUseCase: GetCounselListUseCase) {}

  async execute(query: GetCounselListQuery): Promise<Counsels[]> {
    const { userId } = query.props;
    const { ok, error, counselList } = await this.getCounsleListUseCase.execute({ userId });
    if (!ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }

    return counselList;
  }
}
