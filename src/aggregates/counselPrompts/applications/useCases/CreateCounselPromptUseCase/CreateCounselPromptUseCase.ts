import { Inject, Injectable } from "@nestjs/common";
import { UseCase } from "~/src/shared/core/applications/UseCase";
import { CreateCounselPromptUseCaseRequest } from "./dto/CreateCounselPrompt.request";
import { CreateCounselPromptUseCaseResponse } from "./dto/CreateCounselPrompt.response";
import { COUNSEL_PROMPT_REPOSITORY, CounselPromptsRepositoryPort } from "../../../infrastructures/counselPrompts.repository.port";
import { CounselPrompts } from "../../../domain/CounselPrompts";
import { Result } from "~/src/shared/core/domain/Result";

@Injectable()
export class CreateCounselPromptUseCase implements UseCase<CreateCounselPromptUseCaseRequest, CreateCounselPromptUseCaseResponse> {
  constructor(
    @Inject(COUNSEL_PROMPT_REPOSITORY)
    private readonly counselPromptsRepository: CounselPromptsRepositoryPort,
  ) {}

  async execute(request: CreateCounselPromptUseCaseRequest): Promise<CreateCounselPromptUseCaseResponse> {
    const { persona, context, instruction, tone, additionalPrompt, promptType, description, version } = request;
    const counselPromptOrError: Result<CounselPrompts> = CounselPrompts.createNew({
      persona,
      context,
      instruction,
      tone,
      additionalPrompt,
      promptType,
      description,
      version,
    });
    if (counselPromptOrError.isFailure) {
      return {
        ok: false,
        error: counselPromptOrError.error,
      };
    }
    const counselPrompt: CounselPrompts = counselPromptOrError.value;
    const savedCounselPrompt: CounselPrompts = await this.counselPromptsRepository.create(counselPrompt);
    return {
      ok: true,
      counselPrompt: savedCounselPrompt,
    };
  }
}
