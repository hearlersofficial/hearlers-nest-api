import { create } from "@bufbuild/protobuf";
import { UserProfiles } from "~/src/aggregates/users/domain/UserProfiles";
import { UserProgresses } from "~/src/aggregates/users/domain/UserProgresses";
import { Users } from "~/src/aggregates/users/domain/Users";
import {
  User,
  UserProfile,
  UserProfileSchema,
  UserProgress,
  UserProgressSchema,
  UserSchema,
} from "~/src/gen/v1/model/user_pb";
import { TimestampUtils } from "~/src/shared/utils/Date.utils";

export class SchemaUsersMapper {
  static toUserProto(user: Users): User {
    return create(UserSchema, {
      id: user.id.getNumber(),
      nickname: user.nickname,
      userProfile: user.userProfile ? this.toUserProfileProto(user.userProfile) : null,
      userProgresses: user.userProgresses ? user.userProgresses.map(this.toUserProgressProto) : null,
      createdAt: TimestampUtils.dayjsToTimestamp(user.createdAt),
      updatedAt: TimestampUtils.dayjsToTimestamp(user.updatedAt),
      deletedAt: user.deletedAt ? TimestampUtils.dayjsToTimestamp(user.deletedAt) : null,
    });
  }

  static toUserProfileProto(userProfile: UserProfiles): UserProfile {
    return create(UserProfileSchema, {
      profileImage: userProfile.profileImage,
      phoneNumber: userProfile.phoneNumber,
      gender: userProfile.gender,
      birthday: userProfile.birthday ? TimestampUtils.dayjsToTimestamp(userProfile.birthday) : null,
      introduction: userProfile.introduction,
      createdAt: TimestampUtils.dayjsToTimestamp(userProfile.createdAt),
      updatedAt: TimestampUtils.dayjsToTimestamp(userProfile.updatedAt),
      deletedAt: userProfile.deletedAt ? TimestampUtils.dayjsToTimestamp(userProfile.deletedAt) : null,
    });
  }

  static toUserProgressProto(userProgress: UserProgresses): UserProgress {
    return create(UserProgressSchema, {
      status: userProgress.status,
      progressType: userProgress.progressType,
      lastUpdated: TimestampUtils.dayjsToTimestamp(userProgress.lastUpdated),
      createdAt: TimestampUtils.dayjsToTimestamp(userProgress.createdAt),
      updatedAt: TimestampUtils.dayjsToTimestamp(userProgress.updatedAt),
      deletedAt: userProgress.deletedAt ? TimestampUtils.dayjsToTimestamp(userProgress.deletedAt) : null,
    });
  }
}
