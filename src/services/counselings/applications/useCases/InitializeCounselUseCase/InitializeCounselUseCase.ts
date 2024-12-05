import { Injectable } from "@nestjs/common";
import { UseCase } from "~/src/shared/core/applications/UseCase";
import { InitializeCounselUseCaseRequest } from "./dto/InitializeCounsel.request";
import { InitializeCounselUseCaseResponse } from "./dto/InitializeCounsel.response";
import { CreateCounselUseCase } from "~/src/aggregates/counsels/applications/useCases/CreateCounselUseCase/CreateCounselUseCase";
import { CreateCounselMessageUseCase } from "~/src/aggregates/counselMessages/applications/useCases/CreateCounselMessageUseCase/CreateCounselMessageUseCase";
import { GetCounselUseCase } from "~/src/aggregates/counsels/applications/useCases/GetCounselUseCase/GetCounselUseCase";
import { UpdateCounselUseCase } from "~/src/aggregates/counsels/applications/useCases/UpdateCounselUseCase/UpdateCounselUseCase";

@Injectable()
export class InitializeCounselUseCase implements UseCase<InitializeCounselUseCaseRequest, InitializeCounselUseCaseResponse> {
  constructor(
    private readonly createCounselUseCase: CreateCounselUseCase,
    private readonly createCounselMessageUseCase: CreateCounselMessageUseCase,
    private readonly updateCounselUseCase: UpdateCounselUseCase,
    private readonly getCounselUseCase: GetCounselUseCase,
  ) {}

  async execute(request: InitializeCounselUseCaseRequest): Promise<InitializeCounselUseCaseResponse> {
    const { userId, counselorId } = request;

    // 상담 생성
    const createCounselResult = await this.createCounselUseCase.execute({ userId, counselorId });
    if (!createCounselResult.ok) {
      return { ok: false, error: createCounselResult.error };
    }
    const counsel = createCounselResult.counsel;

    const firstMessage = {
      counselId: counsel.id.getNumber(),
      message: "안녕! 여기는 내 상담실이야. 여기서는 무슨 이야기든 털어놓을 수 있어. 같이 이야기해볼래?",
      isUserMessage: false,
    };

    const createCounselMessgeResult = await this.createCounselMessageUseCase.execute(firstMessage);
    if (!createCounselMessgeResult.ok) {
      return { ok: false, error: createCounselMessgeResult.error };
    }
    const counselMessage = createCounselMessgeResult.counselMessage;

    counsel.saveLastMessage(counselMessage);
    const updateCounselResult = await this.updateCounselUseCase.execute({ toUpdateCounsel: counsel });
    if (!updateCounselResult.ok) {
      return { ok: false, error: updateCounselResult.error };
    }

    const result = {
      ok: true,
      counsel: updateCounselResult.counsel,
      counselMessages: [counselMessage],
    };

    return result;
  }
}
