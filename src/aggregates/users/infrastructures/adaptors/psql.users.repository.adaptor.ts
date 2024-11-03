import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, FindOptionsWhere } from "typeorm";
import { Users } from "~/src/aggregates/users/domain/users";
import { PsqlUsersMapper } from "~/src/aggregates/users/infrastructures/adaptors/mapper/psql.users.mapper";
import {
  FindOnePropsInUsersRepository,
  UsersRepositoryPort,
} from "~/src/aggregates/users/infrastructures/users.repository.port";
import { UsersEntity } from "~/src/shared/core/infrastructure/entities/Users.entity";

export class PsqlUsersRepositoryAdaptor implements UsersRepositoryPort {
  constructor(@InjectRepository(UsersEntity) private readonly usersRepository) {}
  async findOne(props: FindOnePropsInUsersRepository): Promise<Users | null> {
    const { userId } = props;
    const findOptionsWhere: FindOptionsWhere<UsersEntity> = {};
    findOptionsWhere.id = userId;
    const findOneOptions: FindOneOptions<UsersEntity> = { where: findOptionsWhere };
    const usersEntity: UsersEntity = await this.usersRepository.findOne(findOneOptions);
    return PsqlUsersMapper.toDomain(usersEntity);
  }
}
