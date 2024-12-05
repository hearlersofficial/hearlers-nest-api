import { HttpStatus } from "@nestjs/common";
import { CounselorGender } from "~/src/shared/enums/CounselorGender.enum";
import { CounselorType } from "~/src/shared/enums/CounselorType.enum";
import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";

export class UpdateCounselorCommand {
  constructor(public readonly props: UpdateCounselorCommandProps) {
    this.validate(props);
  }

  private validate(props: UpdateCounselorCommandProps): void {
    if (props.counselorId === null || props.counselorId === undefined) {
      throw new HttpStatusBasedRpcException(HttpStatus.BAD_REQUEST, "상담사 ID는 필수입니다.");
    }

    if (props.counselorType !== null && props.counselorType !== undefined && !Object.values(CounselorType).includes(props.counselorType)) {
      throw new HttpStatusBasedRpcException(HttpStatus.BAD_REQUEST, "유효하지 않은 상담사 타입입니다.");
    }

    if (props.gender !== null && props.gender !== undefined && !Object.values(CounselorGender).includes(props.gender)) {
      throw new HttpStatusBasedRpcException(HttpStatus.BAD_REQUEST, "유효하지 않은 성별입니다");
    }
  }
}

interface UpdateCounselorCommandProps {
  counselorId: number;
  counselorType?: CounselorType;
  name?: string;
  description?: string;
  gender?: CounselorGender;
}
