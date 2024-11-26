import { Counsels } from "~/src/aggregates/counsels/domain/Counsels";

export interface UpdateCounselUseCaseRequest {
  toUpdateCounsel: Counsels;
}
