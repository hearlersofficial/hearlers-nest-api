import { Counselors } from "~/src/aggregates/counselors/domain/counselors";

export interface InitializeCounselUseCaseRequest {
  userId: number;
  counselor: Counselors;
}
