import { Inject, Injectable } from "@nestjs/common";
import { UseCase } from "~/src/shared/core/applications/UseCase";
import { GetCounselPromptUseCaseRequest } from "./dto/GetCounselPrompt.request";
import { GetCounselPromptUseCaseResponse } from "./dto/GetCounselPrompt.response";
import { COUNSEL_PROMPT_REPOSITORY, CounselPromptsRepositoryPort } from "../../../infrastructures/counselPrompts.repository.port";
import { CounselPrompts } from "../../../domain/CounselPrompts";

@Injectable()
export class GetCounselPromptUseCase implements UseCase<GetCounselPromptUseCaseRequest, GetCounselPromptUseCaseResponse> {
  constructor(
    @Inject(COUNSEL_PROMPT_REPOSITORY)
    private readonly counselPromptsRepository: CounselPromptsRepositoryPort,
  ) {}

  async execute(request: GetCounselPromptUseCaseRequest): Promise<GetCounselPromptUseCaseResponse> {
    const { promptType } = request;
    const counselPrompt: CounselPrompts = await this.counselPromptsRepository.findOne({ promptType });
    return {
      ok: true,
      counselPrompt,
    };
  }
}
