import { InternalServerErrorException } from "@nestjs/common";
import { AuthUsers, AuthUsersProps } from "~/src/aggregates/authUsers/domain/AuthUsers";
import { PsqlKakaoMapper } from "~/src/aggregates/authUsers/infrastructures/adaptors/mappers/psql.kakao.mapper";
import { PsqlRefreshTokensMapper } from "~/src/aggregates/authUsers/infrastructures/adaptors/mappers/psql.refreshTokens.mapper";
import { CoreStatus } from "~/src/shared/core/constants/status.constants";
import { Result } from "~/src/shared/core/domain/Result";
import { UniqueEntityId } from "~/src/shared/core/domain/UniqueEntityId";
import { AuthUsersEntity } from "~/src/shared/core/infrastructure/entities/AuthUsers.entity";
import { convertDayjs, formatDayjs } from "~/src/shared/utils/Date.utils";

export class PsqlAuthUsersMapper {
  static toDomain(entity: AuthUsersEntity): AuthUsers | null {
    if (!entity) {
      return null;
    }

    const authUsersProps: AuthUsersProps = {
      status: CoreStatus.ACTIVE,
      userId: entity.userId,
      lastLoginAt: convertDayjs(entity.lastLoginAt),
      authChannel: entity.authChannel,
      kakao: PsqlKakaoMapper.toDomain(entity.kakao),
      createdAt: convertDayjs(entity.createdAt),
      updatedAt: convertDayjs(entity.updatedAt),
      refreshTokens: PsqlRefreshTokensMapper.toVOs(entity.refreshTokens),
    };
    const authUserOrError: Result<AuthUsers> = AuthUsers.create(authUsersProps, new UniqueEntityId(entity.id));
    if (authUserOrError.isFailure) {
      throw new InternalServerErrorException(authUserOrError.errorValue);
    }
    return authUserOrError.value;
  }

  static toEntity(authUser: AuthUsers): AuthUsersEntity {
    const entity = new AuthUsersEntity();

    if (!authUser.id.isNewIdentifier()) {
      entity.id = authUser.id.getNumber();
    }

    entity.userId = authUser.userId;
    entity.lastLoginAt = formatDayjs(authUser.lastLoginAt);
    entity.kakao = PsqlKakaoMapper.toEntity(authUser.kakao);
    entity.refreshTokens = PsqlRefreshTokensMapper.toEntities(authUser.refreshTokens, authUser.id.getNumber());
    entity.authChannel = authUser.authChannel;
    entity.createdAt = formatDayjs(authUser.createdAt);
    entity.updatedAt = formatDayjs(authUser.updatedAt);

    return entity;
  }
}
