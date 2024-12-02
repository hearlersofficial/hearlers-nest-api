import { UseCaseCoreResponse } from "~/src/shared/core/applications/UseCase.response";
import { Counsels } from "~/src/aggregates/counsels/domain/Counsels";
import { CounselMessages } from "~/src/aggregates/counselMessages/domain/CounselMessages";

export interface InitializeCounselUseCaseResponse extends UseCaseCoreResponse {
  counsel?: Counsels;
  counselMessages?: CounselMessages[];
}
