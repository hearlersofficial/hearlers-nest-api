import { CounselPrompt } from "~/src/shared/enums/CounselPrompt.enum";

export interface GetCounselPromptUseCaseRequest {
  promptType: CounselPrompt;
}
