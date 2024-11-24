import { Inject, Injectable } from "@nestjs/common";
import { UseCase } from "~/src/shared/core/applications/UseCase";
import { UpdateCounselUseCaseRequest } from "./dto/updateCounsel.request";
import { UpdateCounselUseCaseResponse } from "./dto/updateCounsel.response";
import { COUNSEL_REPOSITORY, CounselsRepositoryPort } from "../../../infrastructures/counsels.repository.port";

@Injectable()
export class UpdateCounselUseCase implements UseCase<UpdateCounselUseCaseRequest, UpdateCounselUseCaseResponse> {
  constructor(
    @Inject(COUNSEL_REPOSITORY)
    private readonly counselsRepository: CounselsRepositoryPort,
  ) {}

  async execute(request?: UpdateCounselUseCaseRequest): Promise<UpdateCounselUseCaseResponse> {
    const { toUpdateCounsel } = request;

    const savedCounsel = await this.counselsRepository.update(toUpdateCounsel);
    return {
      ok: true,
      counsel: savedCounsel,
    };
  }
}
