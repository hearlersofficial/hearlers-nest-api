import { Column, Entity, OneToOne } from "typeorm";
import { CoreEntity } from "~/src/shared/core/infrastructure/entities/Core.entity";
import { UsersEntity } from "~/src/shared/core/infrastructure/entities/Users.entity";

import { Gender } from "~/src/shared/enums/Gender.enum";

@Entity({ name: "user_profiles" })
export class UserProfilesEntity extends CoreEntity {
  @Column({
    type: "varchar",
    name: "profile_image",
    comment: "프로필 이미지",
  })
  profileImage: string;

  @Column({
    type: "varchar",
    name: "phone_number",
    comment: "전화번호",
  })
  phoneNumber: string;

  @Column({
    type: "enum",
    name: "gender",
    enum: Gender,
    nullable: false,
    comment: "성별",
  })
  gender: Gender;

  @Column({
    type: "timestamp",
    name: "birthday",
    nullable: true,
    comment: "생년월일",
  })
  birthday: string;

  @Column({
    type: "varchar",
    name: "introduction",
    nullable: true,
    length: 500,
    comment: "자기소개",
  })
  introduction: string;

  @OneToOne(() => UsersEntity, (user) => user.userProfiles, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user: UsersEntity;
}
