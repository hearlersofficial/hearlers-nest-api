import { InternalServerErrorException } from "@nestjs/common";
import { Result } from "~/src/shared/core/domain/Result";
import { UniqueEntityId } from "~/src/shared/core/domain/UniqueEntityId";
import { convertDayjs, formatDayjs } from "~/src/shared/utils/Date.utils";
import { CounselsEntity } from "~/src/shared/core/infrastructure/entities/Counsels.entity";
import { Counsels } from "~/src/aggregates/counsels/domain/Counsels";
import { PsqlCounselMessagesMapper } from "~/src/aggregates/counsels/infrastructures/adaptors/mapper/psql.counselMessages.mapper";

export class PsqlCounselsMapper {
  static toDomain(entity: CounselsEntity): Counsels | null {
    if (!entity) {
      return null;
    }

    const counselProps = {
      counselorType: entity.counselorType,
      userId: entity.userId,
      counselStage: entity.counselStage,
      counselMessages: entity.counselMessages?.map((message) => PsqlCounselMessagesMapper.toDomain(message)).filter(Boolean) || [],
      createdAt: convertDayjs(entity.createdAt),
      updatedAt: convertDayjs(entity.updatedAt),
      deletedAt: entity.deletedAt ? convertDayjs(entity.deletedAt) : null,
    };
    const counselsOrError: Result<Counsels> = Counsels.create(counselProps, new UniqueEntityId(entity.id));

    if (counselsOrError.isFailure) {
      throw new InternalServerErrorException(counselsOrError.errorValue);
    }

    return counselsOrError.value;
  }

  static toEntity(counsels: Counsels): CounselsEntity {
    const entity = new CounselsEntity();

    if (!counsels.id.isNewIdentifier()) {
      entity.id = counsels.id.getNumber();
    }

    entity.counselorType = counsels.counselorType;
    entity.userId = counsels.userId;
    entity.counselStage = counsels.counselStage;

    entity.createdAt = formatDayjs(counsels.createdAt);
    entity.updatedAt = formatDayjs(counsels.updatedAt);
    entity.deletedAt = counsels.deletedAt ? formatDayjs(counsels.deletedAt) : null;

    return entity;
  }
}