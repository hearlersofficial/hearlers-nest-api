import { CounselPrompts } from "~/src/aggregates/counselPrompts/domain/CounselPrompts";
import { UseCaseCoreResponse } from "~/src/shared/core/applications/UseCase.response";

export interface GetCounselPromptByIdUseCaseResponse extends UseCaseCoreResponse {
  counselPrompt?: CounselPrompts;
}
