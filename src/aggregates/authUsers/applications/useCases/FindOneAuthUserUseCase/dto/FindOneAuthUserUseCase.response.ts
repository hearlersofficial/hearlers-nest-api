import { AuthUsers } from "~/src/aggregates/authUsers/domain/AuthUsers";
import { UseCaseCoreResponse } from "~/src/shared/core/applications/UseCase.response";

export interface FindOneAuthUserUseCaseResponse extends UseCaseCoreResponse {
  authUser?: AuthUsers | null;
}
