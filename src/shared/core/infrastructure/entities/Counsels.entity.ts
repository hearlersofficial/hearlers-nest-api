import { Column, Entity, OneToMany } from "typeorm";
import { CoreEntity } from "./Core.entity";
import { CounselorType } from "~/src/shared/enums/CounselorType.enum";
import { CounselStage } from "~/src/shared/enums/CounselStage.enum";
import { CounselMessagesEntity } from "./CounselMessages.entity";

@Entity({
  name: "counsels",
})
export class CounselsEntity extends CoreEntity {
  @Column({
    type: "enum",
    name: "counselor_type",
    enum: CounselorType,
    comment: "상담사 타입",
    default: CounselorType.DAHYE,
  })
  counselorType: CounselorType;

  @Column({
    type: "int",
    name: "user_id",
    comment: "사용자 ID",
  })
  userId: number;

  @Column({
    type: "enum",
    name: "counsel_stage",
    enum: CounselStage,
    comment: "상담 단계",
    default: CounselStage.SMALL_TALK,
  })
  counselStage: CounselStage;

  @OneToMany(() => CounselMessagesEntity, (counselMessage) => counselMessage.counsel, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  counselMessages: CounselMessagesEntity[];
}
