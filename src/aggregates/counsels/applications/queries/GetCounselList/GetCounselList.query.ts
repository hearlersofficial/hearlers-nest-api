import { HttpStatus } from "@nestjs/common";
import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";

export class GetCounselListQuery {
  constructor(public readonly props: GetCounselListQueryProps) {
    this.validateProps(props);
  }

  private validateProps(props: GetCounselListQueryProps): void {
    if (!props.userId) {
      throw new HttpStatusBasedRpcException(HttpStatus.BAD_REQUEST, "UserId is required");
    }
  }
}

interface GetCounselListQueryProps {
  userId: number;
}
