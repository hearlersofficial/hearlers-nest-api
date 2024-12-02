import { Inject, Injectable } from "@nestjs/common";
import { UseCase } from "~/src/shared/core/applications/UseCase";
import { COUNSEL_PROMPT_REPOSITORY, CounselPromptsRepositoryPort } from "../../../infrastructures/counselPrompts.repository.port";
import { CounselPrompts } from "../../../domain/CounselPrompts";
import { GetCounselPromptByIdUseCaseRequest } from "./dto/GetCounselPromptById.request";
import { GetCounselPromptByIdUseCaseResponse } from "./dto/GetCounselPromptById.response";

@Injectable()
export class GetCounselPromptByIdUseCase implements UseCase<GetCounselPromptByIdUseCaseRequest, GetCounselPromptByIdUseCaseResponse> {
  constructor(
    @Inject(COUNSEL_PROMPT_REPOSITORY)
    private readonly counselPromptsRepository: CounselPromptsRepositoryPort,
  ) {}

  async execute(request: GetCounselPromptByIdUseCaseRequest): Promise<GetCounselPromptByIdUseCaseResponse> {
    const { counselPromptId } = request;
    const counselPrompt: CounselPrompts = await this.counselPromptsRepository.findOne({ id: counselPromptId });
    return {
      ok: true,
      counselPrompt,
    };
  }
}
