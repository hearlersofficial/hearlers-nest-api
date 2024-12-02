import { Inject, Injectable } from "@nestjs/common";
import { UseCase } from "~/src/shared/core/applications/UseCase";
import { GetCounselPromptListUseCaseRequest } from "./dto/GetCounselPromptList.request";
import { GetCounselPromptListUseCaseResponse } from "./dto/GetCounselPromptList.response";
import { COUNSEL_PROMPT_REPOSITORY, CounselPromptsRepositoryPort } from "../../../infrastructures/counselPrompts.repository.port";

@Injectable()
export class GetCounselPromptListUseCase implements UseCase<GetCounselPromptListUseCaseRequest, GetCounselPromptListUseCaseResponse> {
  constructor(
    @Inject(COUNSEL_PROMPT_REPOSITORY)
    private readonly counselPromptRepository: CounselPromptsRepositoryPort,
  ) {}

  async execute(request: GetCounselPromptListUseCaseRequest): Promise<GetCounselPromptListUseCaseResponse> {
    const { promptType } = request;
    const counselPromptList = await this.counselPromptRepository.findMany({ promptType });
    return {
      ok: true,
      counselPromptList,
    };
  }
}
