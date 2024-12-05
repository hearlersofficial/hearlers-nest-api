import { Inject, Injectable } from "@nestjs/common";
import { UseCase } from "~/src/shared/core/applications/UseCase";
import { UpdateCounselorUseCaseRequest } from "./dto/UpdateCounselor.request";
import { UpdateCounselorUseCaseResponse } from "./dto/UpdateCounselor.response";
import { COUNSELOR_REPOSITORY, CounselorsRepositoryPort } from "../../../infrastructures/counselors.repository.port";

@Injectable()
export class UpdateCounselorUseCase implements UseCase<UpdateCounselorUseCaseRequest, UpdateCounselorUseCaseResponse> {
  constructor(
    @Inject(COUNSELOR_REPOSITORY)
    private readonly counselorsRepository: CounselorsRepositoryPort,
  ) {}

  async execute(request: UpdateCounselorUseCaseRequest): Promise<UpdateCounselorUseCaseResponse> {
    const { toUpdateCounselor } = request;

    const savedCounselor = await this.counselorsRepository.update(toUpdateCounselor);
    return {
      ok: true,
      counselor: savedCounselor,
    };
  }
}
