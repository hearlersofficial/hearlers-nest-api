import { CounselorType } from "~/src/shared/enums/CounselorType.enum";

export interface CreateCounselUseCaseRequest {
  userId: number;
  counselorType: CounselorType;
}
