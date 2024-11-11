import { Users } from "~/src/aggregates/users/domain/Users";

export interface UpdateUserUseCaseRequest {
  toUpdateUser: Users;
}
