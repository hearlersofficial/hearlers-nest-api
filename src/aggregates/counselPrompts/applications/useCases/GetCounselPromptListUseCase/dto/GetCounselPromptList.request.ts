import { CounselPromptType } from "~/src/shared/enums/CounselPromptType.enum";

export interface GetCounselPromptListUseCaseRequest {
  promptType: CounselPromptType;
}
