import { CounselorType } from "~/src/shared/enums/CounselorType.enum";

export interface InitializeCounselUseCaseRequest {
  userId: number;
  counselorType: CounselorType;
}
