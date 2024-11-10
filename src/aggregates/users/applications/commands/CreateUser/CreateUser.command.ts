import { HttpStatus } from "@nestjs/common";
import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";
import { AuthChannel } from "~/src/gen/v1/model/user_pb";
export class CreateUserCommand {
  constructor(public readonly props: CreateUserCommandProps) {
    this.validate(props);
  }

  private validate(props: CreateUserCommandProps): void {
    if (!props.nickname) {
      throw new HttpStatusBasedRpcException(HttpStatus.BAD_REQUEST, "닉네임은 필수입니다.");
    }

    if (!props.authChannel && props.authChannel !== AuthChannel.NONE) {
      throw new HttpStatusBasedRpcException(HttpStatus.BAD_REQUEST, "최초 생성 시 인증 채널은 NONE이여야 합니다.");
    }
  }
}

interface CreateUserCommandProps {
  nickname: string;
  authChannel: AuthChannel;
}
