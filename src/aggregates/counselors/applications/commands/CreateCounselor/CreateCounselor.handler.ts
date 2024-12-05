import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateCounselorCommand } from "./CreateCounselor.command";
import { CreateCounselorUseCase } from "../../useCases/CreateCounselorUseCase/CreateCounselorUseCase";
import { Counselors } from "../../../domain/counselors";
import { HttpStatusBasedRpcException } from "~/src/shared/filters/exceptions";
import { HttpStatus } from "@nestjs/common";

@CommandHandler(CreateCounselorCommand)
export class CreateCounselorHandler implements ICommandHandler<CreateCounselorCommand> {
  constructor(private readonly createCounselUseCase: CreateCounselorUseCase) {}

  async execute(command: CreateCounselorCommand): Promise<Counselors> {
    const { props } = command;

    const createCounselorResult = await this.createCounselUseCase.execute(props);
    if (!createCounselorResult.ok) {
      throw new HttpStatusBasedRpcException(HttpStatus.INTERNAL_SERVER_ERROR, createCounselorResult.error);
    }

    return createCounselorResult.counselor;
  }
}
