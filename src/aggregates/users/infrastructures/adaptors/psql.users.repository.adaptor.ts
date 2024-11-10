import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, FindOptionsRelations, FindOptionsWhere, Repository } from "typeorm";
import { Users } from "~/src/aggregates/users/domain/Users";
import { PsqlUsersMapper } from "~/src/aggregates/users/infrastructures/adaptors/mapper/psql.users.mapper";
import {
  FindOnePropsInUsersRepository,
  UsersRepositoryPort,
} from "~/src/aggregates/users/infrastructures/users.repository.port";
import { UsersEntity } from "~/src/shared/core/infrastructure/entities/Users.entity";
import { AuthChannel } from "~/src/gen/v1/model/user_pb";

export class PsqlUsersRepositoryAdaptor implements UsersRepositoryPort {
  private readonly userFindOptionsRelation: FindOptionsRelations<UsersEntity> = {
    userProfiles: true,
    userProgresses: true,
    userPrompts: true,
  };

  constructor(@InjectRepository(UsersEntity) private readonly usersRepository: Repository<UsersEntity>) {}

  async create(user: Users): Promise<Users> {
    const usersEntity = PsqlUsersMapper.toEntity(user);
    const createdUsersEntity = await this.usersRepository.save(usersEntity);
    return PsqlUsersMapper.toDomain(createdUsersEntity);
  }

  async findOne(props: FindOnePropsInUsersRepository): Promise<Users | null> {
    const { userId, nickname, authChannel, uniqueId } = props;
    const findOptionsRelation = this.userFindOptionsRelation;
    const findOptionsWhere: FindOptionsWhere<UsersEntity> = {};
    if (userId) {
      findOptionsWhere.id = userId;
    }
    if (nickname) {
      findOptionsWhere.nickname = nickname;
    }
    if (authChannel && authChannel === AuthChannel.KAKAO) {
      findOptionsRelation.kakao = true;
      findOptionsWhere.kakao = {
        uniqueId,
      };
    }

    const findOneOptions: FindOneOptions<UsersEntity> = {
      where: findOptionsWhere,
      relations: findOptionsRelation,
    };
    const usersEntity: UsersEntity = await this.usersRepository.findOne(findOneOptions);
    return PsqlUsersMapper.toDomain(usersEntity);
  }

  async update(user: Users): Promise<Users> {
    const usersEntity = PsqlUsersMapper.toEntity(user);
    const updatedUsersEntity = await this.usersRepository.save(usersEntity);
    return PsqlUsersMapper.toDomain(updatedUsersEntity);
  }
}
