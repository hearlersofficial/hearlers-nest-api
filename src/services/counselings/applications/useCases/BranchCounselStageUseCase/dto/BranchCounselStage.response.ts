import { UseCaseCoreResponse } from "~/src/shared/core/applications/UseCase.response";
import { CounselStage } from "~/src/shared/enums/CounselStage.enum";

export interface BranchCounselStageUseCaseResponse extends UseCaseCoreResponse {
  branchedStage?: CounselStage;
}
