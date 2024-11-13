import { Column, Entity, JoinColumn, ManyToOne, RelationId } from "typeorm";
import { CoreEntity } from "./Core.entity";
import { CounselsEntity } from "./Counsels.entity";

@Entity({
  name: "counsel_messages",
})
export class CounselMessagesEntity extends CoreEntity {
  @ManyToOne(() => CounselsEntity, (counsel) => counsel.counselMessages, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "counsel_id" })
  counsel: CounselsEntity;

  @RelationId((counselMessages: CounselMessagesEntity) => counselMessages.counsel)
  @Column({
    type: "int",
    name: "counsel_id",
    comment: "상담 ID",
  })
  counselId: number;

  @Column({
    type: "varchar",
    name: "message",
    comment: "메시지 내용",
  })
  message: string;

  @Column({
    type: "boolean",
    name: "is_user_message",
    comment: "사용자의 메시지인지 여부",
    default: true,
  })
  isUserMessage: boolean;
}
