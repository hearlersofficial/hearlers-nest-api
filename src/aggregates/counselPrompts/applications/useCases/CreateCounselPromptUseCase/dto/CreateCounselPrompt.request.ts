import { CounselPromptType } from "~/src/shared/enums/CounselPromptType.enum";
import { VersionString } from "~/src/shared/types/version.type";

export interface CreateCounselPromptUseCaseRequest {
  persona?: string;
  context?: string;
  instruction?: string;
  tone?: string;
  additionalPrompt?: string;
  promptType: CounselPromptType;
  description?: string;
  version?: VersionString;
}
