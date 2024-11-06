import { Logger, Module, OnModuleInit } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "~/src/aggregates/users/users.module";
import { GrpcUserCommandController } from "~/src/services/users/presentations/grpc/command/users.command.controller";
import { GrpcUserQueryController } from "~/src/services/users/presentations/grpc/query/users.query.controller";
import { TypeOrmConfigs } from "~/src/shared/core/infrastructure/Config";
import { AllExceptionFilter } from "~/src/shared/filters/GrpcExceptionFilter";
import { LoggingInterceptor } from "~/src/shared/interceptors/LoggingInterceptor";

@Module({
  imports: [
    UsersModule,
    CqrsModule,
    ConfigModule.forRoot({
      envFilePath: [".env", ".env.dev"],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigs,
    }),
  ],
  controllers: [GrpcUserCommandController, GrpcUserQueryController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class UsersServiceModule implements OnModuleInit {
  private readonly logger = new Logger(UsersServiceModule.name);

  async onModuleInit() {
    this.logger.log("Users Service Module has been initialized");
    this.logger.log(`Environment: ${process.env.NODE_ENV}`);
    this.logger.log(`GRPC Port: ${process.env.GRPC_PORT}`);
  }
}
