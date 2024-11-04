import { InternalServerErrorException } from "@nestjs/common";
import { UserProfiles } from "~/src/aggregates/users/domain/UserProfiles";
import { Result } from "~/src/shared/core/domain/Result";
import { UniqueEntityId } from "~/src/shared/core/domain/UniqueEntityId";
import { UserProfilesEntity } from "~/src/shared/core/infrastructure/entities/UserProfiles.entity";
import { convertDayjs, formatDayjs } from "~/src/shared/utils/Date.utils";

export class PsqlUserProfilesMapper {
  static toDomain(entity: UserProfilesEntity): UserProfiles | null {
    if (!entity) {
      return null;
    }

    const userProfilesProps = {
      userId: new UniqueEntityId(entity.user.id),
      profileImage: entity.profileImage,
      phoneNumber: entity.phoneNumber,
      gender: entity.gender,
      birthday: entity.birthday,
      introduction: entity.introduction,
      createdAt: convertDayjs(entity.createdAt),
      updatedAt: convertDayjs(entity.updatedAt),
      deletedAt: entity.deletedAt ? convertDayjs(entity.deletedAt) : null,
    };

    const userProfilesOrError: Result<UserProfiles> = UserProfiles.create(
      userProfilesProps,
      new UniqueEntityId(entity.id),
    );

    if (userProfilesOrError.isFailure) {
      throw new InternalServerErrorException(userProfilesOrError.errorValue);
    }

    return userProfilesOrError.value;
  }

  static toEntity(userProfiles: UserProfiles): UserProfilesEntity {
    const entity = new UserProfilesEntity();

    if (!userProfiles.id.isNewIdentifier()) {
      entity.id = userProfiles.id.getNumber();
    }

    entity.profileImage = userProfiles.profileImage;
    entity.phoneNumber = userProfiles.phoneNumber;
    entity.gender = userProfiles.gender;
    entity.birthday = userProfiles.birthday;
    entity.introduction = userProfiles.introduction;
    entity.createdAt = formatDayjs(userProfiles.createdAt);
    entity.updatedAt = formatDayjs(userProfiles.updatedAt);
    entity.deletedAt = userProfiles.deletedAt ? formatDayjs(userProfiles.deletedAt) : null;

    return entity;
  }
}
