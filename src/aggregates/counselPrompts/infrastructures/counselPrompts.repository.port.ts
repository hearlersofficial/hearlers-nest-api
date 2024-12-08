import { CounselPromptType } from "~/src/shared/enums/CounselPromptType.enum";
import { CounselPrompts } from "../domain/CounselPrompts";

export const COUNSEL_PROMPT_REPOSITORY = Symbol("COUNSEL_PROMPT_REPOSITORY");

export interface CounselPromptsRepositoryPort {
  create(counselPrompt: CounselPrompts): Promise<CounselPrompts>;
  findOne(props: FindOnePropsInCounselPromptsRepository): Promise<CounselPrompts | null>;
  findMany(props: FindManyPropsInCounselPromptsRepository): Promise<CounselPrompts[] | null>;
  update(counselPrompt: CounselPrompts): Promise<CounselPrompts>;
}

export interface FindOnePropsInCounselPromptsRepository {
  promptType?: CounselPromptType;
  id?: number;
}

export interface FindManyPropsInCounselPromptsRepository {
  promptType?: CounselPromptType;
}
