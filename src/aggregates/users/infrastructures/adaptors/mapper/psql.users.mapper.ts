import { InternalServerErrorException } from "@nestjs/common";
import { Users, UsersProps } from "~/src/aggregates/users/domain/users";
import { Result } from "~/src/shared/core/domain/Result";
import { UniqueEntityID } from "~/src/shared/core/domain/UniqueEntityID";
import { UsersEntity } from "~/src/shared/core/infrastructure/entities/Users.entity";
import { convertDayjs, formatDayjs } from "~/src/shared/utils/Date.utils";

export class PsqlUsersMapper {
  static toDomain(entity: UsersEntity): Users | null {
    if (!entity) {
      return null;
    }

    const userProps: UsersProps = {
      nickname: entity.nickname,
      profileImage: entity.profileImage,
      authChannel: entity.authChannel,
      phoneNumber: entity.phoneNumber,
      createdAt: convertDayjs(entity.createdAt),
      updatedAt: convertDayjs(entity.updatedAt),
      deletedAt: entity.deletedAt ? convertDayjs(entity.deletedAt) : null,
    };

    const usersOrError: Result<Users> = Users.create(userProps, new UniqueEntityID(entity.id));

    if (usersOrError.isFailure) {
      throw new InternalServerErrorException(usersOrError.errorValue);
    }

    return usersOrError.value;
  }

  static toEntity(users: Users): UsersEntity {
    const entity: UsersEntity = new UsersEntity();

    if (!users.id.isNewIdentifier()) {
      entity.id = users.id.getNumber();
    }

    entity.nickname = users.nickname;
    entity.profileImage = users.profileImage;
    entity.authChannel = users.authChannel;
    entity.phoneNumber = users.phoneNumber;
    entity.createdAt = formatDayjs(users.createdAt);
    entity.updatedAt = formatDayjs(users.updatedAt);
    entity.deletedAt = formatDayjs(users.deletedAt);

    return entity;
  }

  //   static toKakaoEntity(user: UsersEntity, kakao: Kakao): KakaoEntity {
  //     const entity: KakaoEntity = new KakaoEntity();

  //     entity.uniqueID = kakao.uniqueID;
  //     entity.user = user;
  //     entity.createdAt = kakao.createdAt.format("YYYY-MM-DD HH:mm:ss");
  //     entity.updatedAt = kakao.updatedAt.format("YYYY-MM-DD HH:mm:ss");

  //     return entity;
  //   }
}
