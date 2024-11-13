import { UseCaseCoreResponse } from "~/src/shared/core/applications/UseCase.response";
import { Counsels } from "~/src/aggregates/counsels/domain/Counsels";

export interface CreateCounselUseCaseResponse extends UseCaseCoreResponse {
  counsel?: Counsels;
}
