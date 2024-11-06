import { UseCaseCoreResponse } from "~/src/shared/core/applications/UseCase.response";
import { Users } from "~/src/aggregates/users/domain/Users";

export interface CreateUserUseCaseResponse extends UseCaseCoreResponse {
  user?: Users;
}
