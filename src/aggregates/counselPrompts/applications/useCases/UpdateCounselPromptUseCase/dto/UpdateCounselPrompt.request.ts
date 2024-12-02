import { CounselPrompts } from "~/src/aggregates/counselPrompts/domain/CounselPrompts";

export interface UpdateCounselPromptUseCaseRequest {
  toUpdateCounselPrompt: CounselPrompts;
}
