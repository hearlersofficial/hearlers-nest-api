import { HttpStatus } from "@nestjs/common";
import { CounselorGender } from "~/src/shared/enums/CounselorGender.enum";
import { CounselorType } from "~/src/shared/enums/CounselorType.enum";
import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";

export class CreateCounselorCommand {
  constructor(public readonly props: CreateCounselorCommandProps) {
    this.validate(props);
  }

  private validate(props: CreateCounselorCommandProps): void {
    if (props.counselorType === null || props.counselorType === undefined) {
      throw new HttpStatusBasedRpcException(HttpStatus.BAD_REQUEST, "상담사 타입은 필수입니다.");
    }
    if (!Object.values(CounselorType).includes(props.counselorType)) {
      throw new HttpStatusBasedRpcException(HttpStatus.BAD_REQUEST, "유효하지 않은 상담사 타입입니다.");
    }

    if (props.name === null || props.name === undefined) {
      throw new HttpStatusBasedRpcException(HttpStatus.BAD_REQUEST, "상담사 이름은 필수입니다.");
    }

    if (props.description === null || props.description === undefined) {
      throw new HttpStatusBasedRpcException(HttpStatus.BAD_REQUEST, "상담사 설명은 필수입니다.");
    }

    if (props.gender === null || props.gender === undefined) {
      throw new HttpStatusBasedRpcException(HttpStatus.BAD_REQUEST, "성별은 필수입니다.");
    }
    if (!Object.values(CounselorGender).includes(props.gender)) {
      throw new HttpStatusBasedRpcException(HttpStatus.BAD_REQUEST, "유효하지 않은 성별입니다");
    }
  }
}

interface CreateCounselorCommandProps {
  counselorType: CounselorType;
  name: string;
  description: string;
  gender: CounselorGender;
}
