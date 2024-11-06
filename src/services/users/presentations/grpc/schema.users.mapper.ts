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
import { formatDayjs } from "~/src/shared/utils/Date.utils";

export class SchemaUsersMapper {
  static toUserProto(user: Users): User {
    return create(UserSchema, {
      id: user.id.getNumber(),
      nickname: user.nickname,
      authChannel: user.authChannel,
      userProfile: user.userProfile ? this.toUserProfileProto(user.userProfile) : null,
      userProgresses: user.userProgresses ? user.userProgresses.map(this.toUserProgressProto) : null,
      createdAt: formatDayjs(user.createdAt),
      updatedAt: formatDayjs(user.updatedAt),
      deletedAt: formatDayjs(user.deletedAt),
    });
  }

  static toUserProfileProto(userProfile: UserProfiles): UserProfile {
    return create(UserProfileSchema, {
      profileImage: userProfile.profileImage,
      phoneNumber: userProfile.phoneNumber,
      gender: userProfile.gender,
      birthday: formatDayjs(userProfile.birthday),
      introduction: userProfile.introduction,
      createdAt: formatDayjs(userProfile.createdAt),
      updatedAt: formatDayjs(userProfile.updatedAt),
      deletedAt: formatDayjs(userProfile.deletedAt),
    });
  }

  static toUserProgressProto(userProgress: UserProgresses): UserProgress {
    return create(UserProgressSchema, {
      status: userProgress.status,
      progressType: userProgress.progressType,
      lastUpdated: formatDayjs(userProgress.lastUpdated),
      createdAt: formatDayjs(userProgress.createdAt),
      updatedAt: formatDayjs(userProgress.updatedAt),
      deletedAt: formatDayjs(userProgress.deletedAt),
    });
  }
}
