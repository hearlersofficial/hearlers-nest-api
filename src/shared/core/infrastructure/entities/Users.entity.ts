import { Column, Entity, OneToMany, OneToOne, RelationId } from "typeorm";

import { CoreEntity } from "~/src/shared/core/infrastructure/entities/Core.entity";
import { UserActivitiesEntity } from "~/src/shared/core/infrastructure/entities/UserActivities.entity";
import { UserProfilesEntity } from "~/src/shared/core/infrastructure/entities/UserProfiles.entity";
import { UserProgressesEntity } from "~/src/shared/core/infrastructure/entities/UserProgresses.entity";
import { UserPromptsEntity } from "~/src/shared/core/infrastructure/entities/UserPrompts.entity";
import { AuthChannel } from "~/src/gen/v1/model/user_pb";
import { AuthUsersEntity } from "~/src/shared/core/infrastructure/entities/AuthUsers.entity";
import { CoreStatus } from "~/src/shared/core/constants/status.constants";

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

  @OneToOne(() => UserProfilesEntity, (userProfiles) => userProfiles.user, {
    cascade: true,
    nullable: true,
  })
  userProfiles: UserProfilesEntity;

  @RelationId((users: UsersEntity) => users.userProfiles)
  @Column({
    type: "int",
    name: "user_profiles_id",
    comment: "사용자 프로필 ID",
    nullable: true,
  })
  userProfilesId: number;

  @OneToMany(() => UserProgressesEntity, (userProgress) => userProgress.user, {
    cascade: true,
  })
  userProgresses: UserProgressesEntity[];

  @OneToMany(() => UserPromptsEntity, (userPrompt) => userPrompt.user, {
    cascade: true,
  })
  userPrompts: UserPromptsEntity[];

  @OneToMany(() => UserActivitiesEntity, (userActivity) => userActivity.user, {
    cascade: true,
  })
  userActivities: UserActivitiesEntity[];

  @OneToOne(() => AuthUsersEntity, (authUser) => authUser.user, {
    cascade: true,
    orphanedRowAction: "disable",
  })
  authUser: AuthUsersEntity;

  @Column({
    type: "enum",
    name: "status",
    enum: CoreStatus,
    comment: "상태",
    default: CoreStatus.ACTIVE,
  })
  status: CoreStatus;
}
