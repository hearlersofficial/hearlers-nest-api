import { AuthUsers } from "~/src/aggregates/authUsers/domain/AuthUsers";
import { Users } from "~/src/aggregates/users/domain/Users";
import { UseCaseCoreResponse } from "~/src/shared/core/applications/UseCase.response";

export interface BindAuthUserToUseUseCaseResponse extends UseCaseCoreResponse {
  user?: Users;
  authUser?: AuthUsers;
}
