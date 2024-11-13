import { CounselMessages } from "~/src/aggregates/counsels/domain/CounselMessages";
import { UseCaseCoreResponse } from "~/src/shared/core/applications/UseCase.response";

export interface CreateCounselMessageUseCaseResponse extends UseCaseCoreResponse {
  counselMessage?: CounselMessages;
}
