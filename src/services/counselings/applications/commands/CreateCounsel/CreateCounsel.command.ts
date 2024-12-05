import { HttpStatus } from "@nestjs/common";
import { CounselMessages } from "~/src/aggregates/counselMessages/domain/CounselMessages";
import { Counsels } from "~/src/aggregates/counsels/domain/Counsels";
import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";

export class CreateCounselCommand {
  constructor(public readonly props: CreateCounselCommandProps) {
    this.validate(props);
  }

  private validate(props: CreateCounselCommandProps): void {
    if (props.userId === null || props.userId === undefined) {
      throw new HttpStatusBasedRpcException(HttpStatus.BAD_REQUEST, "사용자 ID는 필수입니다.");
    }

    if (!props.counselorId === null || props.counselorId === undefined) {
      throw new HttpStatusBasedRpcException(HttpStatus.BAD_REQUEST, "상담사 ID는 필수입니다.");
    }
  }
}

interface CreateCounselCommandProps {
  userId: number;
  counselorId: number;
}

export interface CreateCounselCommandResult {
  counsel: Counsels;
  counselMessages: CounselMessages[];
}
