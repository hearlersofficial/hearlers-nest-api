import { Column, Entity } from "typeorm";
import { CoreEntity } from "./Core.entity";
import { CounselPrompt } from "~/src/shared/enums/CounselPrompt.enum";

@Entity({
  name: "counsel_prompts",
})
export class CounselPromptsEntity extends CoreEntity {
  @Column({
    type: "text",
    name: "persona",
    comment: "Persona",
    nullable: true,
  })
  persona: string;

  @Column({
    type: "text",
    name: "context",
    comment: "Context",
    nullable: true,
  })
  context: string;

  @Column({
    type: "text",
    name: "instruction",
    comment: "Instruction",
    nullable: true,
  })
  instruction: string;

  @Column({
    type: "text",
    name: "tone",
    comment: "Tone",
    nullable: true,
  })
  tone: string;

  @Column({
    type: "text",
    name: "additional_prompt",
    comment: "추가 프롬프트",
    nullable: true,
  })
  additionalPrompt: string;

  @Column({
    type: "enum",
    name: "prompt_type",
    enum: CounselPrompt,
    comment: "프롬프트 타입",
  })
  promptType: CounselPrompt;

  @Column({
    type: "varchar",
    name: "description",
    comment: "프롬프트 설명",
    nullable: true,
  })
  description: string;

  @Column({
    type: "varchar",
    name: "version",
    comment: "프롬프트 버전",
    default: "1.0",
  })
  version: string;
}
