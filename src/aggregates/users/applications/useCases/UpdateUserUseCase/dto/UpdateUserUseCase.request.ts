import { AuthChannel } from "~/src/gen/v1/model/user_pb";

export interface UpdateUserUseCaseRequest {
  userId: number;
  nickname?: string;
  authChannel?: AuthChannel;
  uniqueId?: string;
}
