import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CounselMessagesRepositoryPort } from "~/src/aggregates/counsels/infrastructures/counselMessages.repository.port";
import { CounselMessagesEntity } from "~/src/shared/core/infrastructure/entities/CounselMessages.entity";
import { CounselMessages } from "~/src/aggregates/counsels/domain/CounselMessages";
import { PsqlCounselMessagesMapper } from "~/src/aggregates/counsels/infrastructures/adaptors/mapper/psql.counselMessages.mapper";

export class PsqlCounselMessagesRepositoryAdaptor implements CounselMessagesRepositoryPort {
  constructor(@InjectRepository(CounselMessagesEntity) private readonly counselMessagesRepository: Repository<CounselMessagesEntity>) {}

  async create(counselMessage: CounselMessages): Promise<CounselMessages> {
    const counselMessagesEntity = PsqlCounselMessagesMapper.toEntity(counselMessage);
    const createdCounselsEntity = await this.counselMessagesRepository.save(counselMessagesEntity);
    return PsqlCounselMessagesMapper.toDomain(createdCounselsEntity);
  }
}
