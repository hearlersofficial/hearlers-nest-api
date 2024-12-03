import { HttpStatus } from "@nestjs/common";
import { CounselPromptType } from "~/src/shared/enums/CounselPromptType.enum";
import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";
import { isValidVersion } from "~/src/shared/types/version.type";

export class CreatePromptCommand {
  constructor(public readonly props: CreatePromptCommandProps) {
    this.validate(props);
  }

  private validate(props: CreatePromptCommandProps): void {
    if (props.promptType === null || props.promptType === undefined) {
      throw new HttpStatusBasedRpcException(HttpStatus.BAD_REQUEST, "프롬프트 타입은 필수입니다.");
    }
    if (!Object.values(CounselPromptType).includes(props.promptType)) {
      throw new HttpStatusBasedRpcException(HttpStatus.BAD_REQUEST, "유효하지 않은 프롬프트 타입입니다.");
    }

    if (props.version !== null && props.version !== undefined && !isValidVersion(props.version)) {
      throw new HttpStatusBasedRpcException(HttpStatus.BAD_REQUEST, "유효하지 않은 version입니다");
    }
  }
}

interface CreatePromptCommandProps {
  persona?: string;
  context?: string;
  instruction?: string;
  tone?: string;
  additionalPrompt?: string;
  promptType: CounselPromptType;
  description?: string;
  version?: string;
}
