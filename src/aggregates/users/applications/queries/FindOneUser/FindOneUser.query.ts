import { HttpStatus } from "@nestjs/common";
import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";

export class FindOneUserQuery {
  constructor(public readonly props: FindOneUserQueryProps) {
    this.validateProps(props);
  }

  private validateProps(props: FindOneUserQueryProps): void {
    if (!props.userId) {
      throw new HttpStatusBasedRpcException(HttpStatus.BAD_REQUEST, "UserId is required");
    }

    if (!Number.isInteger(props.userId)) {
      throw new HttpStatusBasedRpcException(HttpStatus.BAD_REQUEST, "UserId must be an integer");
    }

    if (props.userId <= 0) {
      throw new HttpStatusBasedRpcException(HttpStatus.BAD_REQUEST, "UserId must be a positive number");
    }
  }
}

interface FindOneUserQueryProps {
  userId: number;
}
