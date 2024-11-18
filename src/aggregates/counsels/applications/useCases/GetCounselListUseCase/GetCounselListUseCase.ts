import { Inject, Injectable } from "@nestjs/common";
import { GetCounselListUseCaseRequest } from "~/src/aggregates/counsels/applications/useCases/GetCounselListUseCase/dto/GetCounselList.request";
import { GetCounselListUseCaseResponse } from "~/src/aggregates/counsels/applications/useCases/GetCounselListUseCase/dto/GetCounselList.response";
import { Counsels } from "~/src/aggregates/counsels/domain/Counsels";
import { COUNSEL_REPOSITORY, CounselsRepositoryPort } from "~/src/aggregates/counsels/infrastructures/counsels.repository.port";
import { UseCase } from "~/src/shared/core/applications/UseCase";

@Injectable()
export class GetCounselListUseCase implements UseCase<GetCounselListUseCaseRequest, GetCounselListUseCaseResponse> {
  constructor(
    @Inject(COUNSEL_REPOSITORY)
    private readonly counselsRepository: CounselsRepositoryPort,
  ) {}

  async execute(request: GetCounselListUseCaseRequest): Promise<GetCounselListUseCaseResponse> {
    const { userId } = request;
    const counselList: Counsels[] = await this.counselsRepository.findMany({ userId });
    return {
      ok: true,
      counselList,
    };
  }
}
