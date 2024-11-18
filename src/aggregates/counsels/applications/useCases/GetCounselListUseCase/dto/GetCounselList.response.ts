import { Counsels } from "~/src/aggregates/counsels/domain/Counsels";
import { UseCaseCoreResponse } from "~/src/shared/core/applications/UseCase.response";

export interface GetCounselListUseCaseResponse extends UseCaseCoreResponse {
  counselList?: Counsels[];
}
