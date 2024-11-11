import { AuthChannel } from "~/src/gen/v1/model/user_pb";

export interface FindOneUserUseCaseRequest {
  userId?: number;
  nickname?: string;
  authChannel?: AuthChannel;
  uniqueId?: string;
}
