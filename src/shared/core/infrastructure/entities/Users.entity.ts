import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";

import { CoreEntity } from "~/src/shared/core/infrastructure/entities/Core.entity";
import { KakaoEntity } from "~/src/shared/core/infrastructure/entities/Kakao.entity";
import { UserActivitiesEntity } from "~/src/shared/core/infrastructure/entities/UserActivities.entity";
import { UserProfilesEntity } from "~/src/shared/core/infrastructure/entities/UserProfiles.entity";
import { UserProgressesEntity } from "~/src/shared/core/infrastructure/entities/UserProgresses.entity";
import { UserPromptsEntity } from "~/src/shared/core/infrastructure/entities/UserPrompts.entity";
import { AuthChannel } from "~/src/shared/enums/AuthChannel.enum";

@Entity({
  name: "users",
})
export class UsersEntity extends CoreEntity {
  @Column({
    type: "varchar",
    name: "nickname",
    unique: true,
    comment: "닉네임",
  })
  nickname: string;

  @Column({
    type: "enum",
    name: "auth_channel",
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

  @OneToOne(() => UserProfilesEntity, (userProfiles) => userProfiles.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "user_profiles_id" })
  userProfiles: UserProfilesEntity;

  @OneToMany(() => UserProgressesEntity, (userProgress) => userProgress.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  userProgresses: UserProgressesEntity[];

  @OneToMany(() => UserPromptsEntity, (userPrompt) => userPrompt.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  userPrompts: UserPromptsEntity[];

  @OneToMany(() => UserActivitiesEntity, (userActivity) => userActivity.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  userActivities: UserActivitiesEntity[];
}
