import { Inject, Injectable } from "@nestjs/common";
import { UseCase } from "~/src/shared/core/applications/UseCase";
import { GetCounselMessageListUseCaseRequest } from "./dto/GetCounselMessageList.request";
import { GetCounselMessageListUseCaseResponse } from "./dto/GetCounselMessageList.response";
import { COUNSEL_MESSAGE_REPOSITORY, CounselMessagesRepositoryPort } from "../../../infrastructures/counselMessages.repository.port";
import { CounselMessages } from "../../../domain/CounselMessages";

@Injectable()
export class GetCounselMessageListUseCase implements UseCase<GetCounselMessageListUseCaseRequest, GetCounselMessageListUseCaseResponse> {
  constructor(
    @Inject(COUNSEL_MESSAGE_REPOSITORY)
    private readonly counselMessagesRepository: CounselMessagesRepositoryPort,
  ) {}

  async execute(request: GetCounselMessageListUseCaseRequest): Promise<GetCounselMessageListUseCaseResponse> {
    const { counselId } = request;
    const counselMessageList: CounselMessages[] = await this.counselMessagesRepository.findMany({ counselId });
    return {
      ok: true,
      counselMessageList,
    };
  }
}
