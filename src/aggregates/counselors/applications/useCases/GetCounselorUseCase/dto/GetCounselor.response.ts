import { Counselors } from "~/src/aggregates/counselors/domain/counselors";
import { UseCaseCoreResponse } from "~/src/shared/core/applications/UseCase.response";

export interface GetCounselorUseCaseResponse extends UseCaseCoreResponse {
  counselor?: Counselors;
}
