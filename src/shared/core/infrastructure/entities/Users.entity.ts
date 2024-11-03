import { Column, Entity, OneToOne } from "typeorm";
import { USER } from "~/src/shared/core/constants/table.constant";

import { CoreEntity } from "~/src/shared/core/infrastructure/entities/Core.entity";
import { KakaoEntity } from "~/src/shared/core/infrastructure/entities/Kakao.entity";
import { AuthChannel } from "~/src/shared/enums/AuthChannel.enum";

@Entity({
  name: "users",
})
export class UsersEntity extends CoreEntity {
  @Column({
    type: "varchar",
    name: USER.COLUMN.NICKNAME,
    unique: true,
    comment: "닉네임",
  })
  nickname: string;

  @Column({
    type: "varchar",
    name: USER.COLUMN.PROFILE_IMAGE,
    comment: "프로필 이미지",
  })
  profileImage: string;

  @Column({
    type: "varchar",
    name: USER.COLUMN.PHONE_NUMBER,
    comment: "전화번호",
  })
  phoneNumber: string;

  @Column({
    type: "enum",
    name: USER.COLUMN.AUTH_CHANNEL,
    enum: AuthChannel,
    comment: "인증 채널",
    default: AuthChannel.NONE,
  })
  authChannel: AuthChannel;

  @OneToOne(() => KakaoEntity, (kakao) => kakao.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  kakao: KakaoEntity;

  // @OneToOne(() => NaverEntity, (naver) => naver.user, {
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE",
  // })
  // naver: NaverEntity;
}
