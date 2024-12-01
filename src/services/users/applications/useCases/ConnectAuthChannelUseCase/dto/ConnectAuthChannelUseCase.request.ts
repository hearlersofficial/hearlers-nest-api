import { AuthChannel } from "~/src/gen/v1/model/auth_user_pb";

export interface ConnectAuthChannelUseCaseRequest {
  userId: number;
  channelInfo: {
    uniqueId: string;
    authChannel: AuthChannel;
  };
}