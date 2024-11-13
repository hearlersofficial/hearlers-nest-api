import { create } from "@bufbuild/protobuf";
import { Controller } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { GrpcMethod } from "@nestjs/microservices";
import { CreateCounselCommand } from "~/src/aggregates/counsels/applications/commands/CreateCounsel/CreateCounsel.command";
import { Counsels } from "~/src/aggregates/counsels/domain/Counsels";
import { CreateCounselRequest, CreateCounselResult, CreateCounselResultSchema } from "~/src/gen/v1/service/counsel_pb";
import { SchemaCounselsMapper } from "~/src/services/counselings/presentations/grpc/schema.counsels.mapper";

@Controller("counsel")
export class GrpcCounselCommandController {
  constructor(private readonly commandBus: CommandBus) {}

  @GrpcMethod("CounselService", "CreateCounsel")
  async createCounsel(request: CreateCounselRequest): Promise<CreateCounselResult> {
    const command: CreateCounselCommand = new CreateCounselCommand({
      userId: request.userId,
      counselorType: request.counselorType,
    });
    const counsel: Counsels = await this.commandBus.execute(command);
    return create(CreateCounselResultSchema, { counsel: SchemaCounselsMapper.toCounselProto(counsel) });
  }
}
