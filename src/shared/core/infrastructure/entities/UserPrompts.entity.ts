import { Column, Entity, ManyToOne, JoinColumn, RelationId } from "typeorm";
import { CoreEntity } from "./Core.entity";
import { UsersEntity } from "./Users.entity";
import { PromptTemplatesEntity } from "./PromptTemplates.entity";
import { Context, Analysis } from "~/src/shared/types/prompts.types";
import { EntityConversation } from "~/src/shared/types/prompts.types";

@Entity({ name: "user_prompts" })
export class UserPromptsEntity extends CoreEntity {
  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: "user_id" })
  user: UsersEntity;

  @RelationId((userPrompts: UserPromptsEntity) => userPrompts.user)
  @Column({
    type: "int",
    name: "user_id",
    comment: "사용자 ID",
  })
  userId: number;

  @ManyToOne(() => PromptTemplatesEntity)
  @JoinColumn({ name: "template_id" })
  template: PromptTemplatesEntity;

  @RelationId((userPrompts: UserPromptsEntity) => userPrompts.template)
  @Column({
    type: "int",
    name: "template_id",
    comment: "템플릿 ID",
  })
  templateId: number;

  @Column({
    type: "jsonb",
    name: "context",
    comment: "상담 컨텍스트 데이터",
  })
  context: Context;

  @Column({
    type: "text",
    name: "generated_prompt",
    comment: "실제 생성된 프롬프트",
  })
  generatedPrompt: string;

  @Column({
    type: "jsonb",
    name: "conversation_history",
    comment: "대화 히스토리",
    default: [],
  })
  conversationHistory: EntityConversation[];

  @Column({
    type: "jsonb",
    name: "analysis",
    nullable: true,
    comment: "상담 분석 데이터",
  })
  analysis: Analysis;
}
