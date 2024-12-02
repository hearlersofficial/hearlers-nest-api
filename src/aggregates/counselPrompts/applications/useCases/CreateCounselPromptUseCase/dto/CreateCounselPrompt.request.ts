import { CounselPrompt } from "~/src/shared/enums/CounselPrompt.enum";

export interface CreateCounselPromptUseCaseRequest {
  persona?: string;
  context?: string;
  instruction?: string;
  tone?: string;
  additionalPrompt?: string;
  promptType: CounselPrompt;
  description?: string;
  version?: string;
}
