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
import { GetPromptListHandler } from "./applications/queries/GetPromptList/GetPromptList.handler";
import { CreatePromptHandler } from "./applications/commands/CreatePrompt/CreatePrompt.handler";
import { UpdatePromptHandler } from "./applications/commands/UpdatePrompt/UpdatePrompt.handler";

const useCases = [
  GetCounselPromptByIdUseCase,
  GetCounselPromptByTypeUseCase,
  GetCounselPromptListUseCase,
  CreateCounselPromptUseCase,
  UpdateCounselPromptUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([CounselPromptsEntity])],
  providers: [
    ...useCases,
    GetPromptListHandler,
    CreatePromptHandler,
    UpdatePromptHandler,
    {
      provide: COUNSEL_PROMPT_REPOSITORY,
      useClass: PsqlCounselPromptsRepositoryAdaptor,
    },
  ],
  exports: [...useCases],
})
export class CounselPromptsModule {}
