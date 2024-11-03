import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FindOneUserHandler } from "~/src/aggregates/users/applications/queries/FindOneUser/FindOneUser.handler";
import { FindOneUserUseCase } from "~/src/aggregates/users/applications/useCases/findOneUser/FindOneUserUseCase";
import { PsqlUsersRepositoryAdaptor } from "~/src/aggregates/users/infrastructures/adaptors/psql.users.repository.adaptor";
import { USER_REPOSITORY } from "~/src/aggregates/users/infrastructures/users.repository.port";
import { GrpcUserCommandController } from "~/src/aggregates/users/presentations/grpc/command/users.command.controller";
import { GrpcUserQueryController } from "~/src/aggregates/users/presentations/grpc/query/users.query.controller";
import { UsersEntity } from "~/src/shared/core/infrastructure/entities/Users.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity]), CqrsModule],
  providers: [
    FindOneUserUseCase,
    FindOneUserHandler,
    {
      provide: USER_REPOSITORY,
      useClass: PsqlUsersRepositoryAdaptor,
    },
  ],
  controllers: [GrpcUserCommandController, GrpcUserQueryController],
  exports: [],
})
export class UsersModule {}
