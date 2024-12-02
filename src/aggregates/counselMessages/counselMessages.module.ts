import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CounselMessagesEntity } from "~/src/shared/core/infrastructure/entities/CounselMessages.entity";
import { CreateCounselMessageUseCase } from "./applications/useCases/CreateCounselMessageUseCase/CreateCounselMessageUseCase";
import { GetCounselMessageListUseCase } from "./applications/useCases/GetCounselMessageListUseCase/GetCounselMessageListUseCase";
import { GetMessageListHandler } from "./applications/queries/GetMessageList/GetMessageList.handler";
import { COUNSEL_MESSAGE_REPOSITORY } from "./infrastructures/counselMessages.repository.port";
import { PsqlCounselMessagesRepositoryAdaptor } from "./infrastructures/adaptors/psql.counselMessages.repository.adaptor";

@Module({
  imports: [TypeOrmModule.forFeature([CounselMessagesEntity])],
  providers: [
    CreateCounselMessageUseCase,
    GetCounselMessageListUseCase,
    GetMessageListHandler,
    {
      provide: COUNSEL_MESSAGE_REPOSITORY,
      useClass: PsqlCounselMessagesRepositoryAdaptor,
    },
  ],
  exports: [CreateCounselMessageUseCase, GetCounselMessageListUseCase],
})
export class CounselMessagesModule {}
