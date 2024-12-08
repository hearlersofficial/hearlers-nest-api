import { Inject, Injectable } from "@nestjs/common";
import { UseCase } from "~/src/shared/core/applications/UseCase";
import { CreateCounselUseCaseRequest } from "./dto/CreateCounsel.request";
import { CreateCounselUseCaseResponse } from "./dto/CreateCounsel.response";
import { COUNSEL_REPOSITORY, CounselsRepositoryPort } from "~/src/aggregates/counsels/infrastructures/counsels.repository.port";
import { Counsels } from "~/src/aggregates/counsels/domain/Counsels";
import { Result } from "~/src/shared/core/domain/Result";

@Injectable()
export class CreateCounselUseCase implements UseCase<CreateCounselUseCaseRequest, CreateCounselUseCaseResponse> {
  constructor(
    @Inject(COUNSEL_REPOSITORY)
    private readonly counselsRepository: CounselsRepositoryPort,
  ) {}

  async execute(request: CreateCounselUseCaseRequest): Promise<CreateCounselUseCaseResponse> {
    const { userId, counselorId } = request;
    const counselOrError: Result<Counsels> = Counsels.createNew({ userId, counselorId });
    if (counselOrError.isFailure) {
      return {
        ok: false,
        error: counselOrError.error,
      };
    }
    const counsel: Counsels = counselOrError.value;
    const savedCounsel: Counsels = await this.counselsRepository.create(counsel);
    return {
      ok: true,
      counsel: savedCounsel,
    };
  }
}
