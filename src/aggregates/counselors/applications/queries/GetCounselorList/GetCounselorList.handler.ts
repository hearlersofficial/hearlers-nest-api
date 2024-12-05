import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetCounselorListQuery } from "./GetCounselorList.query";
import { GetCounselorListUseCase } from "../../useCases/GetCounselorListUseCase/GetCounselorListUseCase";
import { Counselors } from "../../../domain/counselors";
import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";
import { HttpStatus } from "@nestjs/common";

@QueryHandler(GetCounselorListQuery)
export class GetCounselorListHandler implements IQueryHandler<GetCounselorListQuery> {
  constructor(private readonly getCounselorListUseCase: GetCounselorListUseCase) {}

  async execute(query: GetCounselorListQuery): Promise<Counselors[]> {
    const { counselorType } = query.props;
    const getCounselorListResult = await this.getCounselorListUseCase.execute({ counselorType });
    if (!getCounselorListResult.ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, getCounselorListResult.error);
    }
    const counselorList = getCounselorListResult.counselorList;

    // 버블 추가
    counselorList.forEach((counselor) => {
      counselor.addBubble();
    });

    return counselorList;
  }
}
