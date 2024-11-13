import { CounselMessages } from "~/src/aggregates/counsels/domain/CounselMessages";

export const COUNSEL_MESSAGE_REPOSITORY = Symbol("COUNSEL_MESSAGE_REPOSITORY");

export interface CounselMessagesRepositoryPort {
  create(counselMessage: CounselMessages): Promise<CounselMessages>;
}
