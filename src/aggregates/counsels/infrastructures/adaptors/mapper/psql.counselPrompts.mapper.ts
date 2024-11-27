import { InternalServerErrorException } from "@nestjs/common";
import { Result } from "~/src/shared/core/domain/Result";
import { UniqueEntityId } from "~/src/shared/core/domain/UniqueEntityId";
import { convertDayjs, formatDayjs } from "~/src/shared/utils/Date.utils";
import { CounselPromptsEntity } from "~/src/shared/core/infrastructure/entities/CounselPrompts.entity";
import { CounselPrompts } from "../../../domain/CounselPrompts";

export class PsqlCounselPromptsMapper {
  static toDomain(entity: CounselPromptsEntity): CounselPrompts | null {
    if (!entity) {
      return null;
    }

    const counselPromptsProps = {
      persona: entity.persona ?? null,
      context: entity.context ?? null,
      instruction: entity.instruction ?? null,
      tone: entity.tone ?? null,
      additionalPrompt: entity.additionalPrompt ?? null,
      promptType: entity.promptType,
      description: entity.description ?? null,
      version: entity.version,
      createdAt: convertDayjs(entity.createdAt),
      updatedAt: convertDayjs(entity.updatedAt),
      deletedAt: entity.deletedAt ? convertDayjs(entity.deletedAt) : null,
    };
    const counselPromptsOrError: Result<CounselPrompts> = CounselPrompts.create(counselPromptsProps, new UniqueEntityId(entity.id));

    if (counselPromptsOrError.isFailure) {
      throw new InternalServerErrorException(counselPromptsOrError.errorValue);
    }

    return counselPromptsOrError.value;
  }

  static toEntity(counselPrompts: CounselPrompts): CounselPromptsEntity {
    const entity = new CounselPromptsEntity();

    if (!counselPrompts.id.isNewIdentifier()) {
      entity.id = counselPrompts.id.getNumber();
    }

    entity.persona = counselPrompts.persona ?? null;
    entity.context = counselPrompts.context ?? null;
    entity.instruction = counselPrompts.instruction ?? null;
    entity.tone = counselPrompts.tone ?? null;
    entity.additionalPrompt = counselPrompts.additionalPrompt ?? null;
    entity.promptType = counselPrompts.promptType;
    entity.description = counselPrompts.description ?? null;
    entity.version = counselPrompts.version;

    entity.createdAt = formatDayjs(counselPrompts.createdAt);
    entity.updatedAt = formatDayjs(counselPrompts.updatedAt);
    entity.deletedAt = counselPrompts.deletedAt ? formatDayjs(counselPrompts.deletedAt) : null;

    return entity;
  }
}
