import { CounselPrompt } from "~/src/shared/enums/CounselPrompt.enum";

export interface GetCounselPromptByTypeUseCaseRequest {
  promptType: CounselPrompt;
}
