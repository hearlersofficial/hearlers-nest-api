import { Inject, Logger, Module, OnModuleInit } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CounselsModule } from "~/src/aggregates/counsels/counsels.module";
import { GrpcCounselCommandController } from "~/src/services/counselings/presentations/grpc/command/counsels.command.controller";
import { ClientsConfigs, KAFKA_CLIENT, TypeOrmConfigs } from "~/src/shared/core/infrastructure/Config";
import { AllExceptionFilter } from "~/src/shared/filters/GrpcExceptionFilter";
import { LoggingInterceptor } from "~/src/shared/interceptors/LoggingInterceptor";
import { GrpcCounselQueryController } from "./presentations/grpc/query/counsels.query.controller";
import { CounselMessagesModule } from "~/src/aggregates/counselMessages/counselMessages.module";
import { CounselPromptsModule } from "~/src/aggregates/counselPrompts/counselPrompts.module";
import { InitializeCounselUseCase } from "./applications/useCases/InitializeCounselUseCase/InitializeCounselUseCase";
import { CreateCounselHandler } from "./applications/commands/CreateCounsel/CreateCounsel.handler";
import { BranchCounselStageUseCase } from "./applications/useCases/BranchCounselStageUseCase/BranchCounselStageUseCase";
import { GenerateGptResponseUseCase } from "./applications/useCases/GenerateGptResponseUseCase/GenerateGptResponseUseCase";
import { CreateMessageHandler } from "./applications/commands/CreateMessage/CreateMessage.handler";
import { CounselorsModule } from "~/src/aggregates/counselors/counselors.module";
import { InitializeCounselWithBubbleUseCase } from "./applications/useCases/InitializeCounselWithBubbleUseCase/InitializeCounselWithBubbleUseCase";
import { ClientKafka, ClientsModule } from "@nestjs/microservices";

@Module({
  imports: [
    CounselsModule,
    CounselMessagesModule,
    CounselPromptsModule,
    CounselorsModule,
    CqrsModule,
    ConfigModule.forRoot({
      envFilePath: [".env", ".env.dev"],
      isGlobal: true,
    }),
    ClientsModule.registerAsync({ clients: [{ useClass: ClientsConfigs, name: KAFKA_CLIENT }], isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigs,
    }),
  ],
  controllers: [GrpcCounselCommandController, GrpcCounselQueryController],
  providers: [
    InitializeCounselUseCase,
    InitializeCounselWithBubbleUseCase,
    BranchCounselStageUseCase,
    GenerateGptResponseUseCase,
    CreateCounselHandler,
    CreateMessageHandler,
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
export class CounselsServiceModule implements OnModuleInit {
  constructor(@Inject(KAFKA_CLIENT) private readonly kafkaClient: ClientKafka) {}
  private readonly logger = new Logger(CounselsServiceModule.name);

  async onModuleInit() {
    await this.kafkaClient.connect();
    this.logger.log("Counselings Service Module has been initialized");
    this.logger.log(`Environment: ${process.env.NODE_ENV}`);
    this.logger.log(`GRPC Port: ${process.env.GRPC_PORT}`);
    this.logger.log(`Kafka Bootstrap Servers: ${process.env.KAFKA_BOOTSTRAP_SERVERS}`);
    this.logger.log(`Kafka Client ID: ${process.env.KAFKA_CLIENT_ID}`);
    this.logger.log(`Kafka Group ID: ${process.env.KAFKA_GROUP_ID}`);
  }
}
