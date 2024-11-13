import { InjectRepository } from "@nestjs/typeorm";
import { CounselsRepositoryPort } from "../counsels.repository.port";
import { CounselsEntity } from "~/src/shared/core/infrastructure/entities/Counsels.entity";
import { Counsels } from "~/src/aggregates/counsels/domain/Counsels";
import { PsqlCounselsMapper } from "~/src/aggregates/counsels/infrastructures/adaptors/mapper/psql.counsels.mapper";
import { Repository } from "typeorm";

export class PsqlCounselsRepositoryAdaptor implements CounselsRepositoryPort {
  constructor(@InjectRepository(CounselsEntity) private readonly counselsRepository: Repository<CounselsEntity>) {}

  async create(counsel: Counsels): Promise<Counsels> {
    const counselsEntity = PsqlCounselsMapper.toEntity(counsel);
    const createdCounselsEntity = await this.counselsRepository.save(counselsEntity);
    return PsqlCounselsMapper.toDomain(createdCounselsEntity);
  }
}
