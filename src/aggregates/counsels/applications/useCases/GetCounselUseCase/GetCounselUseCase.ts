import { Inject, Injectable } from "@nestjs/common";
import { Counsels } from "~/src/aggregates/counsels/domain/Counsels";
import { COUNSEL_REPOSITORY, CounselsRepositoryPort } from "~/src/aggregates/counsels/infrastructures/counsels.repository.port";
import { UseCase } from "~/src/shared/core/applications/UseCase";
import { GetCounselUseCaseRequest } from "./dto/GetCounsel.request";
import { GetCounselUseCaseResponse } from "./dto/GetCounsel.response";

@Injectable()
export class GetCounselUseCase implements UseCase<GetCounselUseCaseRequest, GetCounselUseCaseResponse> {
  constructor(
    @Inject(COUNSEL_REPOSITORY)
    private readonly counselsRepository: CounselsRepositoryPort,
  ) {}

  async execute(request: GetCounselUseCaseRequest): Promise<GetCounselUseCaseResponse> {
    const { counselId } = request;
    const counsel: Counsels = await this.counselsRepository.findOne({ counselId });
    return {
      ok: true,
      counsel,
    };
  }
}
