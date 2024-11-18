import { Inject, Injectable } from "@nestjs/common";
import { UseCase } from "~/src/shared/core/applications/UseCase";
import { Result } from "~/src/shared/core/domain/Result";
import { CreateCounselMessageUseCaseRequest } from "~/src/aggregates/counsels/applications/useCases/CreateCounselMessageUseCase/dto/CreateCounselMessage.request";
import { CreateCounselMessageUseCaseResponse } from "~/src/aggregates/counsels/applications/useCases/CreateCounselMessageUseCase/dto/CreateCounselMessage.response";
import { CounselMessages } from "~/src/aggregates/counsels/domain/CounselMessages";
import { COUNSEL_MESSAGE_REPOSITORY, CounselMessagesRepositoryPort } from "~/src/aggregates/counsels/infrastructures/counselMessages.repository.port";
import { UniqueEntityId } from "~/src/shared/core/domain/UniqueEntityId";
import { COUNSEL_REPOSITORY, CounselsRepositoryPort } from "../../../infrastructures/counsels.repository.port";

@Injectable()
export class CreateCounselMessageUseCase implements UseCase<CreateCounselMessageUseCaseRequest, CreateCounselMessageUseCaseResponse> {
  constructor(
    @Inject(COUNSEL_MESSAGE_REPOSITORY)
    private readonly counselMessagesRepository: CounselMessagesRepositoryPort,
    @Inject(COUNSEL_REPOSITORY)
    private readonly counselsRepository: CounselsRepositoryPort,
  ) {}

  async execute(request: CreateCounselMessageUseCaseRequest): Promise<CreateCounselMessageUseCaseResponse> {
    const { counselId, message, isUserMessage } = request;
    const counselMessageOrError: Result<CounselMessages> = CounselMessages.createNew({ counselId: new UniqueEntityId(counselId), message, isUserMessage });
    if (counselMessageOrError.isFailure) {
      return {
        ok: false,
        error: counselMessageOrError.error,
      };
    }
    const counselMessage: CounselMessages = counselMessageOrError.value;
    const savedCounselMessage: CounselMessages = await this.counselMessagesRepository.create(counselMessage);

    // last message 저장
    const counsel = await this.counselsRepository.findOne({ counselId });
    counsel.saveLastMessage(savedCounselMessage);
    await this.counselsRepository.update(counsel);

    return {
      ok: true,
      counselMessage: savedCounselMessage,
    };
  }
}
