import { HttpStatus } from "@nestjs/common";
import { CounselPromptType } from "~/src/shared/enums/CounselPromptType.enum";
import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";

export class GetPromptListQuery {
  constructor(public readonly props: GetPromptListQueryProps) {
    this.validateProps(props);
  }

  private validateProps(props: GetPromptListQueryProps): void {
    if (props.promptType === null || props.promptType === undefined) {
      throw new HttpStatusBasedRpcException(HttpStatus.BAD_REQUEST, "프롬프트 타입은 필수입니다.");
    }
    if (!Object.values(CounselPromptType).includes(props.promptType)) {
      throw new HttpStatusBasedRpcException(HttpStatus.BAD_REQUEST, "유효하지 않은 프롬프트 타입입니다.");
    }
  }
}

interface GetPromptListQueryProps {
  promptType: CounselPromptType;
}
