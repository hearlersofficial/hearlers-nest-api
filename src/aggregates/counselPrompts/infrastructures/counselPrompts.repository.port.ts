import { CounselPrompt } from "~/src/shared/enums/CounselPrompt.enum";
import { CounselPrompts } from "../domain/CounselPrompts";

export const COUNSEL_PROMPT_REPOSITORY = Symbol("COUNSEL_PROMPT_REPOSITORY");

export interface CounselPromptsRepositoryPort {
  create(counselPrompt: CounselPrompts): Promise<CounselPrompts>;
  findOne(props: FindOnePropsInCounselPromptsRepository): Promise<CounselPrompts | null>;
  findMany(props: FindManyPropsInCounselPromptsRepository): Promise<CounselPrompts[] | null>;
  update(counselPrompt: CounselPrompts): Promise<CounselPrompts>;
}

export interface FindOnePropsInCounselPromptsRepository {
  promptType?: CounselPrompt;
  id?: number;
}

export interface FindManyPropsInCounselPromptsRepository {
  promptType?: CounselPrompt;
}
