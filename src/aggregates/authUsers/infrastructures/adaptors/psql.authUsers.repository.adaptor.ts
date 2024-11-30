import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { AuthUsers } from "~/src/aggregates/authUsers/domain/AuthUsers";
import { PsqlAuthUsersMapper } from "~/src/aggregates/authUsers/infrastructures/adaptors/mappers/psql.authUsers.mapper";
import {
  AuthUsersRepositoryPort,
  FindOnePropsInAuthUsersRepository,
} from "~/src/aggregates/authUsers/infrastructures/authUsers.repository.port";
import { AuthChannel } from "~/src/gen/v1/model/user_pb";
import { AuthUsersEntity } from "~/src/shared/core/infrastructure/entities/AuthUsers.entity";

export class PsqlAuthUsersRepositoryAdaptor implements AuthUsersRepositoryPort {
  constructor(@InjectRepository(AuthUsersEntity) private readonly authUsersRepository: Repository<AuthUsersEntity>) {}

  async create(authUsers: AuthUsers): Promise<AuthUsers> {
    const entity = PsqlAuthUsersMapper.toEntity(authUsers);
    const createdEntity = await this.authUsersRepository.create(entity);
    const result = await this.authUsersRepository.save(createdEntity);
    return PsqlAuthUsersMapper.toDomain(result);
  }

  async update(authUsers: AuthUsers): Promise<AuthUsers> {
    const entity = PsqlAuthUsersMapper.toEntity(authUsers);
    const createdEntity = await this.authUsersRepository.create(entity);
    const updatedEntity = await this.authUsersRepository.save(createdEntity);
    return PsqlAuthUsersMapper.toDomain(updatedEntity);
  }

  async findOne(props: FindOnePropsInAuthUsersRepository): Promise<AuthUsers | null> {
    const { userId, authUserId, channelInfo } = props;
    const where: FindOptionsWhere<AuthUsersEntity> = {};
    if (userId) {
      where.userId = userId;
    }
    if (authUserId) {
      where.id = authUserId;
    }
    if (channelInfo) {
      where.authChannel = channelInfo.authChannel;
      switch (channelInfo.authChannel) {
        case AuthChannel.KAKAO:
          where.kakao = { uniqueId: channelInfo.uniqueId };
          break;
      }
    }
    const result = await this.authUsersRepository.findOne({ where });
    return result ? PsqlAuthUsersMapper.toDomain(result) : null;
  }
}
