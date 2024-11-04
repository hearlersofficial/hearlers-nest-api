import { Users } from "~/src/aggregates/users/domain/Users";

export const USER_REPOSITORY = Symbol("USER_REPOSITORY");

export interface UsersRepositoryPort {
  findOne(props: FindOnePropsInUsersRepository): Promise<Users | null>;
}

export interface FindOnePropsInUsersRepository {
  userId: number;
}
