import { CounselorType } from "~/src/shared/enums/CounselorType.enum";

export interface GetCounselorListUseCaseRequest {
  counselorType?: CounselorType;
}
