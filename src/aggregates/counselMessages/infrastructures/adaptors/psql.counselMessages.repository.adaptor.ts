import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, FindOptionsOrder, FindOptionsWhere, Repository } from "typeorm";
import {
  CounselMessagesRepositoryPort,
  FindManyPropsInCounselMessagesRepository,
} from "~/src/aggregates/counselMessages/infrastructures/counselMessages.repository.port";
import { CounselMessagesEntity } from "~/src/shared/core/infrastructure/entities/CounselMessages.entity";
import { CounselMessages } from "~/src/aggregates/counselMessages/domain/CounselMessages";
import { PsqlCounselMessagesMapper } from "./mapper/psql.counselMessages.mapper";
import { Inject } from "@nestjs/common";
import { KAFKA_CLIENT } from "~/src/shared/core/infrastructure/Config";
import { ClientKafka } from "@nestjs/microservices";

export class PsqlCounselMessagesRepositoryAdaptor implements CounselMessagesRepositoryPort {
  constructor(
    @InjectRepository(CounselMessagesEntity) private readonly counselMessagesRepository: Repository<CounselMessagesEntity>,
    @Inject(KAFKA_CLIENT) private readonly kafkaProducer: ClientKafka,
  ) {}

  async publishDomainEvents(counselMessage: CounselMessages): Promise<void> {
    const domainEvents = counselMessage.domainEvents;
    for (const domainEvent of domainEvents) {
      this.kafkaProducer.emit(domainEvent.topic, domainEvent.binary);
    }
    counselMessage.clearEvents();
  }

  async create(counselMessage: CounselMessages): Promise<CounselMessages> {
    const counselMessagesEntity = PsqlCounselMessagesMapper.toEntity(counselMessage);
    const createdCounselsEntity = await this.counselMessagesRepository.save(counselMessagesEntity);

    await this.publishDomainEvents(counselMessage);

    return PsqlCounselMessagesMapper.toDomain(createdCounselsEntity);
  }

  async findMany(props: FindManyPropsInCounselMessagesRepository): Promise<CounselMessages[]> {
    const { counselId } = props;
    const findOptionsWhere: FindOptionsWhere<CounselMessagesEntity> = {};
    if (counselId !== null && counselId !== undefined) {
      findOptionsWhere.counselId = counselId;
    }

    const findOptionsOrder: FindOptionsOrder<CounselMessagesEntity> = { createdAt: "ASC" };

    const findManyOptions: FindManyOptions<CounselMessagesEntity> = {
      where: findOptionsWhere,
      order: findOptionsOrder,
    };

    const counselMessagesEntities = await this.counselMessagesRepository.find(findManyOptions);
    const counselMessageList = counselMessagesEntities.map((counselMessagesEntity) => PsqlCounselMessagesMapper.toDomain(counselMessagesEntity));
    if (counselMessageList.length === 0) {
      counselMessageList.forEach((counselMessage) => this.publishDomainEvents(counselMessage));
    }

    return counselMessageList;
  }
}
