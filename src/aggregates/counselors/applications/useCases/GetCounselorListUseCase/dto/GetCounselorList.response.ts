import { Counselors } from "~/src/aggregates/counselors/domain/counselors";
import { UseCaseCoreResponse } from "~/src/shared/core/applications/UseCase.response";

export interface GetCounselorListUseCaseResponse extends UseCaseCoreResponse {
  counselorList?: Counselors[];
}
