import { InjectRepository } from "@nestjs/typeorm";
import { CounselorsRepositoryPort, FindManyPropsInCounselorsRepository, FindOnePropsInCounselorsRepository } from "../counselors.repository.port";
import { CounselorsEntity } from "~/src/shared/core/infrastructure/entities/Counselor.entity";
import { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";
import { Counselors } from "../../domain/counselors";
import { PsqlCounselorsMapper } from "./mapper/psql.counselors.mapper";

export class PsqlCounselorsRepositoryAdaptor implements CounselorsRepositoryPort {
  constructor(@InjectRepository(CounselorsEntity) private readonly counselorsRepository: Repository<CounselorsEntity>) {}

  async create(counselor: Counselors): Promise<Counselors> {
    const counselorsEntity = PsqlCounselorsMapper.toEntity(counselor);
    const createdCounselorsEntity = await this.counselorsRepository.save(counselorsEntity);
    return PsqlCounselorsMapper.toDomain(createdCounselorsEntity);
  }

  async findMany(props: FindManyPropsInCounselorsRepository): Promise<Counselors[] | null> {
    const { counselorType } = props;
    const findOptionsWhere: FindOptionsWhere<CounselorsEntity> = {};
    if (counselorType !== null && counselorType !== undefined) {
      findOptionsWhere.counselorType = counselorType;
    }

    const findManyOptions: FindManyOptions<CounselorsEntity> = {
      where: findOptionsWhere,
    };

    const counselorsEntities: CounselorsEntity[] = await this.counselorsRepository.find(findManyOptions);
    return counselorsEntities.map((entity) => PsqlCounselorsMapper.toDomain(entity));
  }

  async findOne(props: FindOnePropsInCounselorsRepository): Promise<Counselors | null> {
    const { counselorId } = props;
    const findOptionsWhere: FindOptionsWhere<CounselorsEntity> = {};
    if (counselorId !== null && counselorId !== undefined) {
      findOptionsWhere.id = counselorId;
    }

    const findOneOptions: FindManyOptions<CounselorsEntity> = {
      where: findOptionsWhere,
    };

    const counselorsEntity: CounselorsEntity = await this.counselorsRepository.findOne(findOneOptions);
    return PsqlCounselorsMapper.toDomain(counselorsEntity);
  }

  async update(counselor: Counselors): Promise<Counselors> {
    const counselorsEntity = PsqlCounselorsMapper.toEntity(counselor);
    const updatedCounselorsEntity = await this.counselorsRepository.save(counselorsEntity, { reload: true });
    return PsqlCounselorsMapper.toDomain(updatedCounselorsEntity);
  }
}
