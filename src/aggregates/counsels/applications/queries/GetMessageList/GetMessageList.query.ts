import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetMessageListQuery } from "./GetMessageList.handller";
import { GetCounselMessageListUseCase } from "../../useCases/GetCounselMessageListUseCase/GetCounselMessageListUseCase";
import { CounselMessages } from "../../../domain/CounselMessages";
import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";
import { HttpStatus } from "@nestjs/common";

@QueryHandler(GetMessageListQuery)
export class GetMessageListHandler implements IQueryHandler<GetMessageListQuery> {
  constructor(private readonly getCounselMessageListUseCase: GetCounselMessageListUseCase) {}

  async execute(query: GetMessageListQuery): Promise<CounselMessages[]> {
    const { counselId } = query.props;
    const { ok, error, counselMessageList } = await this.getCounselMessageListUseCase.execute({ counselId });
    if (!ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }

    return counselMessageList;
  }
}
