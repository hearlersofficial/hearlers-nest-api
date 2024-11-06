import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CreateUserHandler } from "~/src/aggregates/users/applications/commands/CreateUser/CreateUser.handler";
import { FindOneUserHandler } from "~/src/aggregates/users/applications/queries/FindOneUser/FindOneUser.handler";
import { CreateUserUseCase } from "~/src/aggregates/users/applications/useCases/CreateUserUseCase/CreateUserUseCase";
import { FindOneUserUseCase } from "~/src/aggregates/users/applications/useCases/FindOneUserUseCase/FindOneUserUseCase";

import { PsqlUsersRepositoryAdaptor } from "~/src/aggregates/users/infrastructures/adaptors/psql.users.repository.adaptor";
import { USER_REPOSITORY } from "~/src/aggregates/users/infrastructures/users.repository.port";
import { UserProfilesEntity } from "~/src/shared/core/infrastructure/entities/UserProfiles.entity";
import { UserProgressesEntity } from "~/src/shared/core/infrastructure/entities/UserProgresses.entity";
import { UserPromptsEntity } from "~/src/shared/core/infrastructure/entities/UserPrompts.entity";
import { UsersEntity } from "~/src/shared/core/infrastructure/entities/Users.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, UserProgressesEntity, UserProfilesEntity, UserPromptsEntity])],
  providers: [
    FindOneUserUseCase,
    FindOneUserHandler,
    CreateUserUseCase,
    CreateUserHandler,
    {
      provide: USER_REPOSITORY,
      useClass: PsqlUsersRepositoryAdaptor,
    },
  ],
  exports: [],
})
export class UsersModule {}
