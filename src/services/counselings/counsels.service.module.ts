import { Logger, Module, OnModuleInit } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CounselsModule } from "~/src/aggregates/counsels/counsels.module";
import { GrpcCounselCommandController } from "~/src/services/counselings/presentations/grpc/command/counsels.command.controller";
import { TypeOrmConfigs } from "~/src/shared/core/infrastructure/Config";
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
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigs,
    }),
  ],
  controllers: [GrpcCounselCommandController, GrpcCounselQueryController],
  providers: [
    InitializeCounselUseCase,
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
  private readonly logger = new Logger(CounselsServiceModule.name);

  async onModuleInit() {
    this.logger.log("Counselings Service Module has been initialized");
    this.logger.log(`Environment: ${process.env.NODE_ENV}`);
    this.logger.log(`GRPC Port: ${process.env.GRPC_PORT}`);
  }
}
