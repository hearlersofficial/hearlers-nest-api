import { AuthUsers } from "~/src/aggregates/authUsers/domain/AuthUsers";

export interface UpdateAuthUserUseCaseRequest {
  toUpdateAuthUser: AuthUsers;
}
