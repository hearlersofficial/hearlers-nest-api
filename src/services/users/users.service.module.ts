import { Inject, Logger, Module, OnModuleInit } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { CommandBus, CqrsModule } from "@nestjs/cqrs";
import { ClientKafka, ClientsModule } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "~/src/aggregates/users/users.module";
import { GrpcUserCommandController } from "~/src/services/users/presentations/grpc/command/users.command.controller";
import { GrpcUserQueryController } from "~/src/services/users/presentations/grpc/query/users.query.controller";
import { UsersMessageController } from "~/src/services/users/presentations/message/users.message.controller";
import { ClientsConfigs, KAFKA_CLIENT, TypeOrmConfigs } from "~/src/shared/core/infrastructure/Config";
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
    ClientsModule.registerAsync({ clients: [{ useClass: ClientsConfigs, name: KAFKA_CLIENT }], isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigs }),
  ],
  controllers: [GrpcUserCommandController, GrpcUserQueryController, UsersMessageController],
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
  constructor(
    @Inject(KAFKA_CLIENT) private readonly kafkaClient: ClientKafka,
    private readonly commandBus: CommandBus,
  ) {}
  private readonly logger = new Logger(UsersServiceModule.name);

  async onModuleInit() {
    await this.kafkaClient.connect();
    this.logger.log("Users Service Module has been initialized");
    console.log("Registered Handlers:", this.commandBus["handlers"]); // 핸들러 목록 확인
    this.logger.log(`Environment: ${process.env.NODE_ENV}`);
    this.logger.log(`GRPC Port: ${process.env.GRPC_PORT}`);
    this.logger.log(`Kafka Bootstrap Servers: ${process.env.KAFKA_BOOTSTRAP_SERVERS}`);
    this.logger.log(`Kafka Client ID: ${process.env.KAFKA_CLIENT_ID}`);
    this.logger.log(`Kafka Group ID: ${process.env.KAFKA_GROUP_ID}`);
  }
}
