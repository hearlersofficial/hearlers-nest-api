import { InternalServerErrorException } from "@nestjs/common";
import { Users } from "~/src/aggregates/users/domain/Users";
import { Result } from "~/src/shared/core/domain/Result";
import { UniqueEntityId } from "~/src/shared/core/domain/UniqueEntityId";
import { UsersEntity } from "~/src/shared/core/infrastructure/entities/Users.entity";
import { PsqlUserProfilesMapper } from "./psql.userProfiles.mapper";
import { PsqlUserProgressesMapper } from "./psql.userProgresses.mapper";
import { PsqlUserPromptsMapper } from "./psql.userPrompts.mapper";
import { convertDayjs, formatDayjs } from "~/src/shared/utils/Date.utils";

export class PsqlUsersMapper {
  static toDomain(entity: UsersEntity): Users | null {
    if (!entity) {
      return null;
    }

    const userProps = {
      nickname: entity.nickname,
      authChannel: entity.authChannel,
      userProfile: entity.userProfiles ? PsqlUserProfilesMapper.toDomain(entity.userProfiles) : undefined,
      userProgresses:
        entity.userProgresses?.map((progress) => PsqlUserProgressesMapper.toDomain(progress)).filter(Boolean) || [],
      userPrompts: entity.userPrompts?.map((prompt) => PsqlUserPromptsMapper.toDomain(prompt)).filter(Boolean) || [],
      createdAt: convertDayjs(entity.createdAt),
      updatedAt: convertDayjs(entity.updatedAt),
      deletedAt: entity.deletedAt ? convertDayjs(entity.deletedAt) : null,
    };
    const usersOrError: Result<Users> = Users.create(userProps, new UniqueEntityId(entity.id));

    if (usersOrError.isFailure) {
      throw new InternalServerErrorException(usersOrError.errorValue);
    }

    return usersOrError.value;
  }

  static toEntity(users: Users): UsersEntity {
    const entity = new UsersEntity();

    if (!users.id.isNewIdentifier()) {
      entity.id = users.id.getNumber();
    }

    entity.nickname = users.nickname;
    entity.authChannel = users.authChannel;

    // 관계 매핑
    if (users.userProfile) {
      entity.userProfiles = PsqlUserProfilesMapper.toEntity(users.userProfile);
      entity.userProfiles.user = entity; // 양방향 관계 설정
    }

    entity.userProgresses = users.userProgresses.map((progress) => {
      const progressEntity = PsqlUserProgressesMapper.toEntity(progress);
      progressEntity.user = entity; // 양방향 관계 설정
      return progressEntity;
    });

    entity.userPrompts = users.userPrompts.map((prompt) => {
      const promptEntity = PsqlUserPromptsMapper.toEntity(prompt);
      promptEntity.user = entity; // 양방향 관계 설정
      return promptEntity;
    });

    entity.createdAt = formatDayjs(users.createdAt);
    entity.updatedAt = formatDayjs(users.updatedAt);
    entity.deletedAt = users.deletedAt ? formatDayjs(users.deletedAt) : null;

    return entity;
  }
}
