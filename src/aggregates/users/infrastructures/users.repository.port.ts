import { Users } from "~/src/aggregates/users/domain/Users";

export const USER_REPOSITORY = Symbol("USER_REPOSITORY");

export interface UsersRepositoryPort {
  findOne(props: FindOnePropsInUsersRepository): Promise<Users | null>;
  create(user: Users): Promise<Users>;
}

export interface FindOnePropsInUsersRepository {
  userId?: number;
  nickname?: string;
}
