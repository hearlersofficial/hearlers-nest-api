import { Injectable } from "@nestjs/common";
import { BranchCounselStageUseCaseRequest } from "./dto/BranchCounselStage.request";
import { BranchCounselStageUseCaseResponse } from "./dto/BranchCounselStage.response";
import { UseCase } from "~/src/shared/core/applications/UseCase";
import OpenAI from "openai";
import { CounselStage } from "~/src/shared/enums/CounselStage.enum";

@Injectable()
export class BranchCounselStageUseCase implements UseCase<BranchCounselStageUseCaseRequest, BranchCounselStageUseCaseResponse> {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || "",
    });
  }

  async execute(request: BranchCounselStageUseCaseRequest): Promise<BranchCounselStageUseCaseResponse> {
    const { prompts } = request;
    const completion = await this.openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: this.BRANCH_MSG,
        },
        {
          role: "user",
          content: JSON.stringify(prompts),
        },
      ],
      temperature: 0,
    });
    const branch = completion?.choices[0]?.message?.content;
    if (!branch) {
      return {
        ok: false,
        error: "상담 분기에 실패했습니다.",
      };
    }
    let branchedStage: CounselStage = null;

    if (branch.includes("1")) {
      branchedStage = CounselStage.POSITIVE;
    } else if (branch.includes("2")) {
      branchedStage = CounselStage.NEGATIVE_WITH_REASON;
    } else if (branch.includes("3")) {
      branchedStage = CounselStage.NEGATIVE_WITHOUT_REASON;
    } else {
      branchedStage = CounselStage.POSITIVE;
    }

    return {
      ok: true,
      branchedStage,
    };
  }

  private BRANCH_MSG = `
<Task>
    Analyze the whole conversation and answer 1, 2, or 3.
    If the 나's feeling is positive, answer 1. If negative, proceed to the next step.
    If there is a clear reason for the negative feeling, answer 2. If there is no reason, answer 3.
    else, answer 4.
</Task>
`;
}
