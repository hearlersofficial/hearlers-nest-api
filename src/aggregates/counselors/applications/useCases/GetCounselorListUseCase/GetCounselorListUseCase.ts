import { Inject, Injectable } from "@nestjs/common";
import { UseCase } from "~/src/shared/core/applications/UseCase";
import { GetCounselorListUseCaseRequest } from "./dto/GetCounselorList.request";
import { GetCounselorListUseCaseResponse } from "./dto/GetCounselorList.response";
import { COUNSELOR_REPOSITORY, CounselorsRepositoryPort } from "../../../infrastructures/counselors.repository.port";

@Injectable()
export class GetCounselorListUseCase implements UseCase<GetCounselorListUseCaseRequest, GetCounselorListUseCaseResponse> {
  constructor(
    @Inject(COUNSELOR_REPOSITORY)
    private readonly counselorsRepository: CounselorsRepositoryPort,
  ) {}

  async execute(request: GetCounselorListUseCaseRequest): Promise<GetCounselorListUseCaseResponse> {
    const { counselorType } = request;
    const counselorList = await this.counselorsRepository.findMany({ counselorType });
    return {
      ok: true,
      counselorList,
    };
  }
}
