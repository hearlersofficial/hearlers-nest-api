import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CounselPromptsEntity } from "~/src/shared/core/infrastructure/entities/CounselPrompts.entity";
import { COUNSEL_PROMPT_REPOSITORY } from "./infrastructures/counselPrompts.repository.port";
import { PsqlCounselPromptsRepositoryAdaptor } from "./infrastructures/adaptors/psql.counselPrompts.repository.adaptor";
import { GetCounselPromptByIdUseCase } from "./applications/useCases/GetCounselPromptByIdUseCase/GetCounselPromptByIdUseCase";
import { GetCounselPromptByTypeUseCase } from "./applications/useCases/GetCounselPromptByTypeUseCase/GetCounselPromptByTypeUseCase";
import { GetCounselPromptListUseCase } from "./applications/useCases/GetCounselPromptListUseCase/GetCounselPromptListUseCase";
import { CreateCounselPromptUseCase } from "./applications/useCases/CreateCounselPromptUseCase/CreateCounselPromptUseCase";
import { UpdateCounselPromptUseCase } from "./applications/useCases/UpdateCounselPromptUseCase/UpdateCounselPromptUseCase";

@Module({
  imports: [TypeOrmModule.forFeature([CounselPromptsEntity])],
  providers: [
    GetCounselPromptByIdUseCase,
    GetCounselPromptByTypeUseCase,
    GetCounselPromptListUseCase,
    CreateCounselPromptUseCase,
    UpdateCounselPromptUseCase,
    {
      provide: COUNSEL_PROMPT_REPOSITORY,
      useClass: PsqlCounselPromptsRepositoryAdaptor,
    },
  ],
  exports: [GetCounselPromptByIdUseCase, GetCounselPromptByTypeUseCase, GetCounselPromptListUseCase, CreateCounselPromptUseCase, UpdateCounselPromptUseCase],
})
export class CounselPromptsModule {}
