import { Inject, Injectable } from "@nestjs/common";
import { UseCase } from "~/src/shared/core/applications/UseCase";
import { UpdateCounselPromptUseCaseRequest } from "./dto/UpdateCounselPrompt.request";
import { UpdateCounselPromptUseCaseResponse } from "./dto/UpdateCounselPrompt.response";
import { COUNSEL_PROMPT_REPOSITORY, CounselPromptsRepositoryPort } from "../../../infrastructures/counselPrompts.repository.port";

@Injectable()
export class UpdateCounselPromptUseCase implements UseCase<UpdateCounselPromptUseCaseRequest, UpdateCounselPromptUseCaseResponse> {
  constructor(
    @Inject(COUNSEL_PROMPT_REPOSITORY)
    private readonly counselPromptsRepository: CounselPromptsRepositoryPort,
  ) {}

  async execute(request?: UpdateCounselPromptUseCaseRequest): Promise<UpdateCounselPromptUseCaseResponse> {
    const { toUpdateCounselPrompt } = request;
    const savedCounselPrompt = await this.counselPromptsRepository.update(toUpdateCounselPrompt);
    return {
      ok: true,
      counselPrompt: savedCounselPrompt,
    };
  }
}
