import { Counsels } from "~/src/aggregates/counsels/domain/Counsels";

export const COUNSEL_REPOSITORY = Symbol("COUNSEL_REPOSITORY");

export interface CounselsRepositoryPort {
  create(counsel: Counsels): Promise<Counsels>;
}
