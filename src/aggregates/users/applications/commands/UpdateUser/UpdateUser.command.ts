import { HttpStatus } from "@nestjs/common";
import { AuthChannel } from "~/src/gen/v1/model/user_pb";
import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";

export class UpdateUserCommand {
  constructor(public readonly props: UpdateUserCommandProps) {
    this.validate(props);
  }

  private validate(props: UpdateUserCommandProps): void {
    if (props.userId === undefined) {
      throw new HttpStatusBasedRpcException(HttpStatus.BAD_REQUEST, "userId는 필수입니다.");
    }
    if (props.authChannel === AuthChannel.KAKAO && !props.uniqueId) {
      throw new HttpStatusBasedRpcException(HttpStatus.BAD_REQUEST, "카카오 인증시 uniqueId는 필수입니다.");
    }
  }
}

interface UpdateUserCommandProps {
  userId: number;
  nickname?: string;
  authChannel?: AuthChannel;
  uniqueId?: string;
}
