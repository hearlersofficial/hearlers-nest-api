import { CounselPrompt } from "~/src/shared/enums/CounselPrompt.enum";
import { CounselPrompts } from "../domain/CounselPrompts";

export const COUNSEL_PROMPT_REPOSITORY = Symbol("COUNSEL_PROMPT_REPOSITORY");

export interface CounselPromptsRepositoryPort {
  findOne(props: FindOnePropsInCounselPromptsRepository): Promise<CounselPrompts | null>;
}

export interface FindOnePropsInCounselPromptsRepository {
  promptType?: CounselPrompt;
}
