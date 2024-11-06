import { AuthChannel } from "~/src/shared/enums/AuthChannel.enum";

export interface CreateUserUseCaseRequest {
  nickname: string;
  authChannel: AuthChannel;
}
