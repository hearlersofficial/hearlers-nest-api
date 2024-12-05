import { HttpStatus } from "@nestjs/common";
import { CounselorType } from "~/src/shared/enums/CounselorType.enum";
import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";

export class GetCounselorListQuery {
  constructor(public readonly props: GetCounselorListQueryProps) {
    this.validateProps(props);
  }

  private validateProps(props: GetCounselorListQueryProps): void {
    if (props.counselorType !== null && props.counselorType !== undefined && !Object.values(CounselorType).includes(props.counselorType)) {
      throw new HttpStatusBasedRpcException(HttpStatus.BAD_REQUEST, "유효하지 않은 상담사 타입입니다.");
    }
  }
}

interface GetCounselorListQueryProps {
  counselorType?: CounselorType;
}
