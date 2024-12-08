import { Inject, Injectable } from "@nestjs/common";
import { UseCase } from "~/src/shared/core/applications/UseCase";
import { CreateCounselorUseCaseRequest } from "./dto/CreateCounselor.request";
import { CreateCounselorUseCaseResponse } from "./dto/CreateCounselor.response";
import { COUNSELOR_REPOSITORY, CounselorsRepositoryPort } from "../../../infrastructures/counselors.repository.port";
import { Result } from "~/src/shared/core/domain/Result";
import { Counselors } from "../../../domain/counselors";

@Injectable()
export class CreateCounselorUseCase implements UseCase<CreateCounselorUseCaseRequest, CreateCounselorUseCaseResponse> {
  constructor(
    @Inject(COUNSELOR_REPOSITORY)
    private readonly counselorsRepository: CounselorsRepositoryPort,
  ) {}

  async execute(request: CreateCounselorUseCaseRequest): Promise<CreateCounselorUseCaseResponse> {
    const { counselorType, name, description, gender } = request;
    const counselorOrError: Result<Counselors> = Counselors.createNew({ counselorType, name, gender, description });
    if (counselorOrError.isFailure) {
      return {
        ok: false,
        error: counselorOrError.error,
      };
    }
    const counselor: Counselors = counselorOrError.value;
    const savedCounselor: Counselors = await this.counselorsRepository.create(counselor);
    return {
      ok: true,
      counselor: savedCounselor,
    };
  }
}
