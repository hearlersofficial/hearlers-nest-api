import { Counselors } from "~/src/aggregates/counselors/domain/counselors";

export interface UpdateCounselorUseCaseRequest {
  toUpdateCounselor: Counselors;
}
