import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReserveTokensHandler } from "~/src/aggregates/users/applications/commands/ReserveTokens/ReserveTokens.handler";
import { UpdateUserHandler } from "~/src/aggregates/users/applications/commands/UpdateUser/UpdateUser.handler";
import { CheckRemainingTokensHandler } from "~/src/aggregates/users/applications/queries/CheckRemainingTokens/CheckRemainingTokens.handler";
import { FindOneUserHandler } from "~/src/aggregates/users/applications/queries/FindOneUser/FindOneUser.handler";
import { CreateUserUseCase } from "~/src/aggregates/users/applications/useCases/CreateUserUseCase/CreateUserUseCase";
import { FindOneUserUseCase } from "~/src/aggregates/users/applications/useCases/FindOneUserUseCase/FindOneUserUseCase";
import { UpdateUserUseCase } from "~/src/aggregates/users/applications/useCases/UpdateUserUseCase/UpdateUserUseCase";

import { PsqlUsersRepositoryAdaptor } from "~/src/aggregates/users/infrastructures/adaptors/psql.users.repository.adaptor";
import { USER_REPOSITORY } from "~/src/aggregates/users/infrastructures/users.repository.port";
import { UserProfilesEntity } from "~/src/shared/core/infrastructure/entities/UserProfiles.entity";
import { UserProgressesEntity } from "~/src/shared/core/infrastructure/entities/UserProgresses.entity";
import { UserPromptsEntity } from "~/src/shared/core/infrastructure/entities/UserPrompts.entity";
import { UsersEntity } from "~/src/shared/core/infrastructure/entities/Users.entity";

const useCases = [CreateUserUseCase, FindOneUserUseCase, UpdateUserUseCase];

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, UserProgressesEntity, UserProfilesEntity, UserPromptsEntity])],
  providers: [
    ...useCases,
    FindOneUserHandler,
    UpdateUserHandler,
    CheckRemainingTokensHandler,
    ReserveTokensHandler,
    {
      provide: USER_REPOSITORY,
      useClass: PsqlUsersRepositoryAdaptor,
    },
  ],
  exports: [...useCases],
})
export class UsersModule {}
