import { ChatCompletionMessageParam } from "openai/resources";

export interface BranchCounselStageUseCaseRequest {
  prompts: ChatCompletionMessageParam[];
}
