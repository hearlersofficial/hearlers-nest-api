import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, FindOptionsOrder, FindOptionsWhere, Repository } from "typeorm";
import {
  CounselMessagesRepositoryPort,
  FindManyPropsInCounselMessagesRepository,
} from "~/src/aggregates/counsels/infrastructures/counselMessages.repository.port";
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

  async findMany(props: FindManyPropsInCounselMessagesRepository): Promise<CounselMessages[]> {
    const { counselId } = props;
    const findOptionsWhere: FindOptionsWhere<CounselMessagesEntity> = {};
    if (counselId) {
      findOptionsWhere.counselId = counselId;
    }
    const findOptionsOrder: FindOptionsOrder<CounselMessagesEntity> = { createdAt: "ASC" };

    const findManyOptions: FindManyOptions<CounselMessagesEntity> = {
      where: findOptionsWhere,
      order: findOptionsOrder,
    };
    const counselMessagesEntities = await this.counselMessagesRepository.find(findManyOptions);
    return counselMessagesEntities.map((counselMessagesEntity) => PsqlCounselMessagesMapper.toDomain(counselMessagesEntity));
  }
}
