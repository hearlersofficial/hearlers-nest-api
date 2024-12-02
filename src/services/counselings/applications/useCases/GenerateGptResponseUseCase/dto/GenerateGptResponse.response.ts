import { UseCaseCoreResponse } from "~/src/shared/core/applications/UseCase.response";

export interface GenerateGptResponseUseCaseResponse extends UseCaseCoreResponse {
  response?: string;
}
