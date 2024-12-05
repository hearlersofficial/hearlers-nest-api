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

const useCases = [CreateCounselUseCase, GetCounselListUseCase, GetCounselUseCase, UpdateCounselUseCase];

@Module({
  imports: [TypeOrmModule.forFeature([CounselsEntity])],
  providers: [
    ...useCases,
    GetCounselListHandler,
    {
      provide: COUNSEL_REPOSITORY,
      useClass: PsqlCounselsRepositoryAdaptor,
    },
  ],
  exports: [...useCases],
})
export class CounselsModule {}
