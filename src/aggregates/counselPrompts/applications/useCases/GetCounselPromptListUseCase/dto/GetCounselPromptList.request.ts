import { CounselPrompt } from "~/src/shared/enums/CounselPrompt.enum";

export interface GetCounselPromptListUseCaseRequest {
  promptType: CounselPrompt;
}
