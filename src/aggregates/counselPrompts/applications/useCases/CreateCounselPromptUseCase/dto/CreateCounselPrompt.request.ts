import { CounselPromptType } from "~/src/shared/enums/CounselPromptType.enum";

export interface CreateCounselPromptUseCaseRequest {
  persona?: string;
  context?: string;
  instruction?: string;
  tone?: string;
  additionalPrompt?: string;
  promptType: CounselPromptType;
  description?: string;
  version?: string;
}
