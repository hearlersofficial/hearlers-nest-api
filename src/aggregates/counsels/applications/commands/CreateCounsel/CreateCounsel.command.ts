import { CounselorType } from "~/src/shared/enums/CounselorType.enum";
import { Counsels } from "../../../domain/Counsels";
import { CounselMessages } from "../../../domain/CounselMessages";

export class CreateCounselCommand {
  constructor(public readonly props: CreateCounselCommandProps) {}
}

interface CreateCounselCommandProps {
  userId: number;
  counselorType: CounselorType;
}

export interface CreateCounselCommandResult {
  counsel: Counsels;
  counselMessages: CounselMessages[];
}
