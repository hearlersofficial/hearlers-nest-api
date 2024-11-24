import { CounselPrompts } from "~/src/aggregates/counsels/domain/CounselPrompts";
import { UseCaseCoreResponse } from "~/src/shared/core/applications/UseCase.response";

export interface GetCounselPromptUseCaseResponse extends UseCaseCoreResponse {
  counselPrompt?: CounselPrompts;
}
