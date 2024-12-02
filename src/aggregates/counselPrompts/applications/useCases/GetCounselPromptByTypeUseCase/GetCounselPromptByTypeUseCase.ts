import { Inject, Injectable } from "@nestjs/common";
import { UseCase } from "~/src/shared/core/applications/UseCase";
import { GetCounselPromptByTypeUseCaseRequest } from "./dto/GetCounselPromptByType.request";
import { GetCounselPromptByTypeUseCaseResponse } from "./dto/GetCounselPromptByType.response";
import { COUNSEL_PROMPT_REPOSITORY, CounselPromptsRepositoryPort } from "../../../infrastructures/counselPrompts.repository.port";
import { CounselPrompts } from "../../../domain/CounselPrompts";

@Injectable()
export class GetCounselPromptByTypeUseCase implements UseCase<GetCounselPromptByTypeUseCaseRequest, GetCounselPromptByTypeUseCaseResponse> {
  constructor(
    @Inject(COUNSEL_PROMPT_REPOSITORY)
    private readonly counselPromptsRepository: CounselPromptsRepositoryPort,
  ) {}

  async execute(request: GetCounselPromptByTypeUseCaseRequest): Promise<GetCounselPromptByTypeUseCaseResponse> {
    const { promptType } = request;
    const counselPrompt: CounselPrompts = await this.counselPromptsRepository.findOne({ promptType });
    return {
      ok: true,
      counselPrompt,
    };
  }
}
