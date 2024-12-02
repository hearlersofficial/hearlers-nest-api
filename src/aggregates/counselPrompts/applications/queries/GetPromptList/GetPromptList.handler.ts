import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetPromptListQuery } from "./GetPromptList.query";
import { GetCounselPromptListUseCase } from "../../useCases/GetCounselPromptListUseCase/GetCounselPromptListUseCase";
import { CounselPrompts } from "../../../domain/CounselPrompts";
import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";
import { HttpStatus } from "@nestjs/common";

@QueryHandler(GetPromptListQuery)
export class GetPromptListHandler implements IQueryHandler<GetPromptListQuery> {
  constructor(private readonly getCounselPromptListUseCase: GetCounselPromptListUseCase) {}

  async execute(query: GetPromptListQuery): Promise<CounselPrompts[]> {
    const { promptType } = query.props;
    const { ok, error, counselPromptList } = await this.getCounselPromptListUseCase.execute({ promptType });
    if (!ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, error);
    }

    return counselPromptList;
  }
}
