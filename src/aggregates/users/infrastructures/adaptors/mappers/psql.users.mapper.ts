import { InternalServerErrorException } from "@nestjs/common";
import { Users, UsersProps } from "~/src/aggregates/users/domain/Users";
import { Result } from "~/src/shared/core/domain/Result";
import { UniqueEntityId } from "~/src/shared/core/domain/UniqueEntityId";
import { UsersEntity } from "~/src/shared/core/infrastructure/entities/Users.entity";
import { PsqlUserProfilesMapper } from "./psql.userProfiles.mapper";
import { PsqlUserProgressesMapper } from "./psql.userProgresses.mapper";
import { PsqlUserPromptsMapper } from "./psql.userPrompts.mapper";
import { convertDayjs, formatDayjs } from "~/src/shared/utils/Date.utils";
import { PsqlUserMessageTokensMapper } from "~/src/aggregates/users/infrastructures/adaptors/mappers/psql.userMessageTokens.mapper";

export class PsqlUsersMapper {
  static toDomain(entity: UsersEntity): Users | null {
    if (!entity) {
      return null;
    }

    const userProps: UsersProps = {
      nickname: entity.nickname,
      userProfile: entity.userProfiles ? PsqlUserProfilesMapper.toDomain(entity.userProfiles) : undefined,
      userProgresses:
        entity.userProgresses?.map((progress) => PsqlUserProgressesMapper.toDomain(progress)).filter(Boolean) || [],
      userPrompts: entity.userPrompts?.map((prompt) => PsqlUserPromptsMapper.toDomain(prompt)).filter(Boolean) || [],
      userMessageToken: entity.userMessageTokens
        ? PsqlUserMessageTokensMapper.toDomain(entity.userMessageTokens)
        : undefined,
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

    // 관계 매핑
    if (users.userProfile) {
      entity.userProfiles = PsqlUserProfilesMapper.toEntity(users.userProfile);
    }
    if (users.userMessageToken) {
      entity.userMessageTokens = PsqlUserMessageTokensMapper.toEntity(users.userMessageToken);
    }

    entity.userProgresses = users.userProgresses.map((progress) => {
      const progressEntity = PsqlUserProgressesMapper.toEntity(progress);
      return progressEntity;
    });

    entity.userPrompts = users.userPrompts.map((prompt) => {
      const promptEntity = PsqlUserPromptsMapper.toEntity(prompt);
      return promptEntity;
    });

    entity.createdAt = formatDayjs(users.createdAt);
    entity.updatedAt = formatDayjs(users.updatedAt);
    entity.deletedAt = users.deletedAt ? formatDayjs(users.deletedAt) : null;

    return entity;
  }
}
