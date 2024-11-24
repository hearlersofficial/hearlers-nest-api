import { CounselMessages } from "~/src/aggregates/counsels/domain/CounselMessages";
import { UseCaseCoreResponse } from "~/src/shared/core/applications/UseCase.response";

export interface GetCounselMessageListUseCaseResponse extends UseCaseCoreResponse {
  counselMessageList?: CounselMessages[];
}
