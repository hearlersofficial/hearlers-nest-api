import { AuthChannel } from "~/src/shared/enums/AuthChannel.enum";

export class CreateUserCommand {
  constructor(public readonly props: CreateUserCommandProps) {}
}

interface CreateUserCommandProps {
  nickname: string;
  authChannel: AuthChannel;
}
