import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CounselMessagesEntity } from "~/src/shared/core/infrastructure/entities/CounselMessages.entity";
import { CounselsEntity } from "~/src/shared/core/infrastructure/entities/Counsels.entity";
import { COUNSEL_REPOSITORY } from "./infrastructures/counsels.repository.port";
import { PsqlCounselsRepositoryAdaptor } from "~/src/aggregates/counsels/infrastructures/adaptors/psql.counsels.repository.adaptor";
import { CreateCounselHandler } from "~/src/aggregates/counsels/applications/commands/CreateCounsel/CreateCounsel.handler";
import { CreateCounselUseCase } from "~/src/aggregates/counsels/applications/useCases/CreateCounselUseCase/CreateCounselUseCase";
import { PsqlCounselMessagesRepositoryAdaptor } from "~/src/aggregates/counsels/infrastructures/adaptors/psql.counselMessages.repository.adaptor";
import { COUNSEL_MESSAGE_REPOSITORY } from "~/src/aggregates/counsels/infrastructures/counselMessages.repository.port";
import { CreateCounselMessageUseCase } from "~/src/aggregates/counsels/applications/useCases/CreateCounselMessageUseCase/CreateCounselMessageUseCase";
import { GetCounselListUseCase } from "./applications/useCases/GetCounselListUseCase/GetCounselListUseCase";
import { GetCounselListHandler } from "./applications/queries/GetCounselList/GetCounselList.handler";
import { GetCounselUseCase } from "./applications/useCases/GetCounselUseCase/GetCounselUseCase";
import { GetCounselPromptUseCase } from "./applications/useCases/GetCounselPromptUseCase/GetCounselPromptUseCase";
import { PsqlCounselPromptsRepositoryAdaptor } from "./infrastructures/adaptors/psql.counselPrompts.repository.adaptor";
import { COUNSEL_PROMPT_REPOSITORY } from "./infrastructures/counselPrompts.repository.port";
import { GetCounselMessageListUseCase } from "./applications/useCases/GetCounselMessageListUseCase/GetCounselMessageListUseCase";
import { UpdateCounselUseCase } from "./applications/useCases/UpdateCounselUseCase/UpdateCounselUseCase";
import { CounselPromptsEntity } from "~/src/shared/core/infrastructure/entities/CounselPrompts.entity";
import { CreateMessageHandler } from "./applications/commands/CreateMessage/CreateMessage.handler";
import { GetMessageListHandler } from "./applications/queries/GetMessageList/GetMessageList.query";
import { GenerateGptResponseUseCase } from "./applications/useCases/GenerateGptResponseUseCase/GenerateGptResponseUseCase";

@Module({
  imports: [TypeOrmModule.forFeature([CounselsEntity, CounselMessagesEntity, CounselPromptsEntity])],
  providers: [
    CreateCounselUseCase,
    GetCounselListUseCase,
    CreateCounselMessageUseCase,
    GetCounselUseCase,
    GetCounselPromptUseCase,
    GetCounselMessageListUseCase,
    UpdateCounselUseCase,
    GenerateGptResponseUseCase,
    CreateCounselHandler,
    GetCounselListHandler,
    CreateMessageHandler,
    GetMessageListHandler,
    {
      provide: COUNSEL_REPOSITORY,
      useClass: PsqlCounselsRepositoryAdaptor,
    },
    {
      provide: COUNSEL_MESSAGE_REPOSITORY,
      useClass: PsqlCounselMessagesRepositoryAdaptor,
    },
    {
      provide: COUNSEL_PROMPT_REPOSITORY,
      useClass: PsqlCounselPromptsRepositoryAdaptor,
    },
  ],
  exports: [],
})
export class CounselsModule {}
