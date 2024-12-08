import { Counselors } from "~/src/aggregates/counselors/domain/counselors";

export interface InitializeCounselWithBubbleUseCaseRequest {
  userId: number;
  counselor: Counselors;
  introMessage: string;
  responseMessage: string;
}
