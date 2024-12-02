import { CounselPromptType } from "~/src/shared/enums/CounselPromptType.enum";

export interface GetCounselPromptByTypeUseCaseRequest {
  promptType: CounselPromptType;
}
