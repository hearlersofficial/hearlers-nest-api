import { AuthChannel } from "~/src/gen/v1/model/user_pb";

export interface CreateUserUseCaseRequest {
  nickname: string;
  authChannel: AuthChannel;
}
