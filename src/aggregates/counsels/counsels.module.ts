import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CounselsEntity } from "~/src/shared/core/infrastructure/entities/Counsels.entity";
import { COUNSEL_REPOSITORY } from "./infrastructures/counsels.repository.port";
import { PsqlCounselsRepositoryAdaptor } from "~/src/aggregates/counsels/infrastructures/adaptors/psql.counsels.repository.adaptor";
import { CreateCounselUseCase } from "~/src/aggregates/counsels/applications/useCases/CreateCounselUseCase/CreateCounselUseCase";
import { GetCounselListUseCase } from "./applications/useCases/GetCounselListUseCase/GetCounselListUseCase";
import { GetCounselListHandler } from "./applications/queries/GetCounselList/GetCounselList.handler";
import { GetCounselUseCase } from "./applications/useCases/GetCounselUseCase/GetCounselUseCase";
import { UpdateCounselUseCase } from "./applications/useCases/UpdateCounselUseCase/UpdateCounselUseCase";
import { CounselPromptsEntity } from "~/src/shared/core/infrastructure/entities/CounselPrompts.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CounselsEntity, CounselPromptsEntity])],
  providers: [
    CreateCounselUseCase,
    GetCounselListUseCase,
    GetCounselUseCase,
    UpdateCounselUseCase,
    GetCounselListHandler,
    {
      provide: COUNSEL_REPOSITORY,
      useClass: PsqlCounselsRepositoryAdaptor,
    },
  ],
  exports: [CreateCounselUseCase, GetCounselListUseCase, GetCounselUseCase, UpdateCounselUseCase],
})
export class CounselsModule {}
