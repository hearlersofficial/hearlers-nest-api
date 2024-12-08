import { Column, Entity, OneToMany } from "typeorm";
import { CounselorType } from "~/src/shared/enums/CounselorType.enum";
import { CoreEntity } from "./Core.entity";
import { CounselorGender } from "~/src/shared/enums/CounselorGender.enum";
import { CounselsEntity } from "./Counsels.entity";

@Entity({
  name: "counselors",
})
export class CounselorsEntity extends CoreEntity {
  @Column({
    type: "enum",
    name: "counselor_type",
    enum: CounselorType,
    comment: "상담사 타입",
  })
  counselorType: CounselorType;

  @Column({
    type: "varchar",
    name: "name",
    comment: "상담사 이름",
  })
  name: string;

  @Column({
    type: "enum",
    name: "gender",
    enum: CounselorGender,
    comment: "성별",
  })
  gender: CounselorGender;

  @Column({
    type: "varchar",
    name: "description",
    comment: "상담사 소개",
  })
  description: string;

  @OneToMany(() => CounselsEntity, (counsel) => counsel.counselor, {
    cascade: true,
  })
  counsels: CounselsEntity[];
}
