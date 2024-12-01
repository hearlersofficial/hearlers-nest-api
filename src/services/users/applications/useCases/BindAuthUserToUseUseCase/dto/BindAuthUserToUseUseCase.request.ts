import { AuthUsers } from "~/src/aggregates/authUsers/domain/AuthUsers";
import { Users } from "~/src/aggregates/users/domain/Users";

export interface BindAuthUserToUseUseCaseRequest {
  user: Users;
  authUser: AuthUsers;
}
