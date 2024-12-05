import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateCounselorCommand } from "./UpdateCounselor.command";
import { GetCounselorUseCase } from "../../useCases/GetCounselorUseCase/GetCounselorUseCase";
import { UpdateCounselorUseCase } from "../../useCases/UpdateCounselorUseCase/UpdateCounselorUseCase";
import { Counselors, CounselorsProps } from "../../../domain/counselors";
import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";
import { HttpStatus } from "@nestjs/common";
import { getNowDayjs } from "~/src/shared/utils/Date.utils";

@CommandHandler(UpdateCounselorCommand)
export class UpdateCounselorHandler implements ICommandHandler<UpdateCounselorCommand> {
  constructor(private readonly getCounselorUseCase: GetCounselorUseCase, private readonly updateCounselorUseCase: UpdateCounselorUseCase) {}

  async execute(command: UpdateCounselorCommand): Promise<Counselors> {
    const { counselorId } = command.props;

    const getCounselorResult = await this.getCounselorUseCase.execute({ counselorId });
    if (!getCounselorResult.ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.NOT_FOUND, getCounselorResult.error);
    }
    const originCounselor = getCounselorResult.counselor;

    const updateProps = this.getUpdateProps(command, originCounselor);
    const toUpdateCounselorOrError = Counselors.create(updateProps, originCounselor.id);
    if (toUpdateCounselorOrError.isFailure) {
      throw new HttpStatusBasedRpcException(HttpStatus.BAD_REQUEST, toUpdateCounselorOrError.error);
    }
    const toUpdateCounselor = toUpdateCounselorOrError.value;

    const updateCounselorResult = await this.updateCounselorUseCase.execute({ toUpdateCounselor });
    if (!updateCounselorResult.ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, updateCounselorResult.error);
    }

    return updateCounselorResult.counselor;
  }

  private getUpdateProps(command: UpdateCounselorCommand, originCounselor: Counselors): CounselorsProps {
    const { counselorType, name, description, gender } = command.props;
    const props = originCounselor.propsValue;
    if (counselorType !== null && counselorType !== undefined) props.counselorType = counselorType;
    if (name !== null && name !== undefined) props.name = name;
    if (description !== null && description !== undefined) props.description = description;
    if (gender !== null && gender !== undefined) props.gender = gender;
    props.updatedAt = getNowDayjs();

    return props;
  }
}
