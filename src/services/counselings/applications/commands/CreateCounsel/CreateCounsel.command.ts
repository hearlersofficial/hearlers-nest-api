import { HttpStatus } from "@nestjs/common";
import { CounselMessages } from "~/src/aggregates/counselMessages/domain/CounselMessages";
import { Counsels } from "~/src/aggregates/counsels/domain/Counsels";
import { CounselorType } from "~/src/shared/enums/CounselorType.enum";
import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";

export class CreateCounselCommand {
  constructor(public readonly props: CreateCounselCommandProps) {
    this.validate(props);
  }

  private validate(props: CreateCounselCommandProps): void {
    if (props.userId === null || props.userId === undefined) {
      throw new HttpStatusBasedRpcException(HttpStatus.BAD_REQUEST, "사용자 ID는 필수입니다.");
    }

    if (!props.counselorType === null || props.counselorType === undefined) {
      throw new HttpStatusBasedRpcException(HttpStatus.BAD_REQUEST, "상담사 타입은 필수입니다.");
    }
    if (!Object.values(CounselorType).includes(this.props.counselorType)) {
      throw new HttpStatusBasedRpcException(HttpStatus.BAD_REQUEST, "유효하지 않은 상담사 타입입니다.");
    }
  }
}

interface CreateCounselCommandProps {
  userId: number;
  counselorType: CounselorType;
}

export interface CreateCounselCommandResult {
  counsel: Counsels;
  counselMessages: CounselMessages[];
}
