import { Inject, Injectable } from "@nestjs/common";
import { UseCase } from "~/src/shared/core/applications/UseCase";
import { GetCounselorUseCaseRequest } from "./dto/GetCounselor.Request";
import { GetCounselorUseCaseResponse } from "./dto/GetCounselor.response";
import { COUNSELOR_REPOSITORY, CounselorsRepositoryPort } from "../../../infrastructures/counselors.repository.port";

@Injectable()
export class GetCounselorUseCase implements UseCase<GetCounselorUseCaseRequest, GetCounselorUseCaseResponse> {
  constructor(
    @Inject(COUNSELOR_REPOSITORY)
    private readonly counselorsRepository: CounselorsRepositoryPort,
  ) {}

  async execute(request: GetCounselorUseCaseRequest): Promise<GetCounselorUseCaseResponse> {
    const { counselorId } = request;
    const counselor = await this.counselorsRepository.findOne({ counselorId });
    return {
      ok: true,
      counselor,
    };
  }
}
