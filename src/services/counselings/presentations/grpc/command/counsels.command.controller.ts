import { create } from "@bufbuild/protobuf";
import { Controller } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { GrpcMethod } from "@nestjs/microservices";
import {
  CreateCounselCommand,
  CreateCounselCommandResult,
} from "~/src/aggregates/counsels/applications/commands/CreateCounsel/CreateCounsel.command";
import { CreateMessageCommand } from "~/src/aggregates/counsels/applications/commands/CreateMessage/CreateMessage.command";
import { CounselMessages } from "~/src/aggregates/counsels/domain/CounselMessages";
import {
  CreateCounselRequest,
  CreateCounselResult,
  CreateCounselResultSchema,
  CreateMessageRequest,
  CreateMessageResult,
  CreateMessageResultSchema,
} from "~/src/gen/v1/service/counsel_pb";
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
    const { counsel, counselMessages }: CreateCounselCommandResult = await this.commandBus.execute(command);

    return create(CreateCounselResultSchema, {
      counsel: SchemaCounselsMapper.toCounselProto(counsel),
      counselMessages: counselMessages.map((counselMessage) =>
        SchemaCounselsMapper.toCounselMessageProto(counselMessage),
      ),
    });
  }

  @GrpcMethod("CounselService", "CreateMessage")
  async createCounselMessage(request: CreateMessageRequest): Promise<CreateMessageResult> {
    const command: CreateMessageCommand = new CreateMessageCommand({
      counselId: request.counselId,
      message: request.message,
    });
    const counselMessage: CounselMessages = await this.commandBus.execute(command);

    return create(CreateMessageResultSchema, {
      counselMessage: SchemaCounselsMapper.toCounselMessageProto(counselMessage),
    });
  }
}
