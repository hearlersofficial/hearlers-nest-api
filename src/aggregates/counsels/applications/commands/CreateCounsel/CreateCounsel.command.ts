import { CounselorType } from "~/src/shared/enums/CounselorType.enum";

export class CreateCounselCommand {
  constructor(public readonly props: CreateCounselCommandProps) {}
}

interface CreateCounselCommandProps {
  userId: number;
  counselorType: CounselorType;
}
