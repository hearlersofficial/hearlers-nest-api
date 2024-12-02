import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CounselPromptsEntity } from "~/src/shared/core/infrastructure/entities/CounselPrompts.entity";
import { COUNSEL_PROMPT_REPOSITORY } from "./infrastructures/counselPrompts.repository.port";
import { PsqlCounselPromptsRepositoryAdaptor } from "./infrastructures/adaptors/psql.counselPrompts.repository.adaptor";
import { GetCounselPromptUseCase } from "./applications/useCases/GetCounselPromptUseCase/GetCounselPromptUseCase";

@Module({
  imports: [TypeOrmModule.forFeature([CounselPromptsEntity])],
  providers: [
    GetCounselPromptUseCase,
    {
      provide: COUNSEL_PROMPT_REPOSITORY,
      useClass: PsqlCounselPromptsRepositoryAdaptor,
    },
  ],
  exports: [GetCounselPromptUseCase],
})
export class CounselPromptsModule {}
