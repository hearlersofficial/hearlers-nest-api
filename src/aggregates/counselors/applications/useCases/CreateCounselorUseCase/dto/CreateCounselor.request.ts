import { CounselorType } from "~/src/shared/enums/CounselorType.enum";
import { CounselorGender } from "~/src/shared/enums/CounselorGender.enum";

export interface CreateCounselorUseCaseRequest {
  counselorType: CounselorType;
  name: string;
  description: string;
  gender: CounselorGender;
}
