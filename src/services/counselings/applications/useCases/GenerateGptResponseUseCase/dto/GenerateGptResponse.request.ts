import { ChatCompletionMessageParam } from "openai/resources";

export interface GenerateGptResponseUseCaseRequest {
  prompts: ChatCompletionMessageParam[];
}
