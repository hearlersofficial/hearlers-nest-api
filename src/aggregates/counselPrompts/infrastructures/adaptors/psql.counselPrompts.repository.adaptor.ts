import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, FindOptionsOrder, FindOptionsWhere, Repository } from "typeorm";
import { CounselPromptsRepositoryPort, FindOnePropsInCounselPromptsRepository } from "../counselPrompts.repository.port";
import { CounselPromptsEntity } from "~/src/shared/core/infrastructure/entities/CounselPrompts.entity";
import { CounselPrompts } from "../../domain/CounselPrompts";
import { PsqlCounselPromptsMapper } from "./mapper/psql.counselPrompts.mapper";

export class PsqlCounselPromptsRepositoryAdaptor implements CounselPromptsRepositoryPort {
  constructor(@InjectRepository(CounselPromptsEntity) private readonly counselPromptsRepository: Repository<CounselPromptsEntity>) {}

  async findOne(props: FindOnePropsInCounselPromptsRepository): Promise<CounselPrompts | null> {
    const { promptType } = props;
    const findOptionsWhere: FindOptionsWhere<CounselPromptsEntity> = {};
    if (promptType !== null || promptType !== undefined) {
      findOptionsWhere.promptType = promptType;
    }

    const findOptionsOrder: FindOptionsOrder<CounselPromptsEntity> = { version: "DESC", createdAt: "DESC" };

    const findOneOptions: FindOneOptions<CounselPromptsEntity> = {
      where: findOptionsWhere,
      order: findOptionsOrder,
    };

    const counselPromptsEntity: CounselPromptsEntity = await this.counselPromptsRepository.findOne(findOneOptions);
    return PsqlCounselPromptsMapper.toDomain(counselPromptsEntity);
  }
}
