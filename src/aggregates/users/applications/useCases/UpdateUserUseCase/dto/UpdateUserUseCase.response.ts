import { Users } from "~/src/aggregates/users/domain/Users";
import { UseCaseCoreResponse } from "~/src/shared/core/applications/UseCase.response";

export interface UpdateUserUseCaseResponse extends UseCaseCoreResponse {
  user?: Users;
}
