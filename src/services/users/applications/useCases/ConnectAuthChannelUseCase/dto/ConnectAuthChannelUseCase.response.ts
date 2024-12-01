import { AuthUsers } from "~/src/aggregates/authUsers/domain/AuthUsers";
import { UseCaseCoreResponse } from "~/src/shared/core/applications/UseCase.response";

export interface ConnectAuthChannelUseCaseResponse extends UseCaseCoreResponse {
  authUser?: AuthUsers;
}
