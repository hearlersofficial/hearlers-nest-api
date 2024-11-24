import { HttpStatus } from "@nestjs/common";
import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";

export class CreateMessageCommand {
  constructor(public readonly props: CreateMessageCommandProps) {
    this.validate(props);
  }

  private validate(props: CreateMessageCommandProps): void {
    if (props.counselId == null || props.counselId === undefined) {
      throw new HttpStatusBasedRpcException(HttpStatus.BAD_REQUEST, "상담 ID는 필수입니다.");
    }
    if (props.message == null || props.message === undefined) {
      throw new HttpStatusBasedRpcException(HttpStatus.BAD_REQUEST, "메시지는 필수입니다.");
    }
  }
}

interface CreateMessageCommandProps {
  counselId: number;
  message: string;
}
