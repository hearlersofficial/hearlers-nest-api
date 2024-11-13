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

@Module({
  imports: [TypeOrmModule.forFeature([CounselsEntity, CounselMessagesEntity])],
  providers: [
    CreateCounselUseCase,
    CreateCounselHandler,
    CreateCounselMessageUseCase,
    {
      provide: COUNSEL_REPOSITORY,
      useClass: PsqlCounselsRepositoryAdaptor,
    },
    {
      provide: COUNSEL_MESSAGE_REPOSITORY,
      useClass: PsqlCounselMessagesRepositoryAdaptor,
    },
  ],
  exports: [],
})
export class CounselsModule {}
