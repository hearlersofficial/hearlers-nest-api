import { create } from "@bufbuild/protobuf";
import { Controller } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { GrpcMethod } from "@nestjs/microservices";
import { CreateMessageCommand } from "~/src/services/counselings/applications/commands/CreateMessage/CreateMessage.command";
import { CounselMessages } from "~/src/aggregates/counselMessages/domain/CounselMessages";
import {
  CreateCounselorRequest,
  CreateCounselorResult,
  CreateCounselorResultSchema,
  CreateCounselRequest,
  CreateCounselResult,
  CreateCounselResultSchema,
  CreateMessageRequest,
  CreateMessageResult,
  CreateMessageResultSchema,
  CreatePromptRequest,
  CreatePromptResult,
  CreatePromptResultSchema,
  UpdateCounselorRequest,
  UpdateCounselorResult,
  UpdateCounselorResultSchema,
  UpdatePromptRequest,
  UpdatePromptResult,
  UpdatePromptResultSchema,
} from "~/src/gen/v1/service/counsel_pb";
import { SchemaCounselsMapper } from "~/src/services/counselings/presentations/grpc/schema.counsels.mapper";
import { CreateCounselCommand, CreateCounselCommandResult } from "../../../applications/commands/CreateCounsel/CreateCounsel.command";
import { CreatePromptCommand } from "~/src/aggregates/counselPrompts/applications/commands/CreatePrompt/CreatePrompt.command";
import { UpdatePromptCommand } from "~/src/aggregates/counselPrompts/applications/commands/UpdatePrompt/UpdatePrompt.command";
import { CreateCounselorCommand } from "~/src/aggregates/counselors/applications/commands/CreateCounselor/CreateCounselor.command";
import { UpdateCounselorCommand } from "~/src/aggregates/counselors/applications/commands/UpdateCounselor/UpdateCounselor.command";

@Controller("counsel")
export class GrpcCounselCommandController {
  constructor(private readonly commandBus: CommandBus) {}

  @GrpcMethod("CounselService", "CreateCounsel")
  async createCounsel(request: CreateCounselRequest): Promise<CreateCounselResult> {
    const command: CreateCounselCommand = new CreateCounselCommand({
      userId: request.userId,
      counselorId: request.counselorId,
      introMessage: request.introMessage,
      responseMessage: request.responseMessage,
    });
    const { counsel, counselMessages }: CreateCounselCommandResult = await this.commandBus.execute(command);

    return create(CreateCounselResultSchema, {
      counsel: SchemaCounselsMapper.toCounselProto(counsel),
      counselMessages: counselMessages.map((counselMessage) => SchemaCounselsMapper.toCounselMessageProto(counselMessage)),
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

  @GrpcMethod("CounselService", "CreatePrompt")
  async createCounselPrompt(request: CreatePromptRequest): Promise<CreatePromptResult> {
    const command: CreatePromptCommand = new CreatePromptCommand(request);
    const counselPrompt = await this.commandBus.execute(command);

    return create(CreatePromptResultSchema, {
      prompt: SchemaCounselsMapper.toCounselPromptProto(counselPrompt),
    });
  }

  @GrpcMethod("CounselService", "UpdatePrompt")
  async updateCounselPrompt(request: UpdatePromptRequest): Promise<UpdatePromptResult> {
    const command: UpdatePromptCommand = new UpdatePromptCommand(request);
    const counselPrompt = await this.commandBus.execute(command);

    return create(UpdatePromptResultSchema, {
      prompt: SchemaCounselsMapper.toCounselPromptProto(counselPrompt),
    });
  }

  @GrpcMethod("CounselService", "CreateCounselor")
  async createCounselor(request: CreateCounselorRequest): Promise<CreateCounselorResult> {
    const command: CreateCounselorCommand = new CreateCounselorCommand({
      counselorType: request.counselorType,
      name: request.name,
      description: request.description,
      gender: request.counselorGender,
    });
    const counselor = await this.commandBus.execute(command);

    return create(CreateCounselorResultSchema, {
      counselor: SchemaCounselsMapper.toCounselorProto(counselor),
    });
  }

  @GrpcMethod("CounselService", "UpdateCounselor")
  async updateCounselor(request: UpdateCounselorRequest): Promise<UpdateCounselorResult> {
    const command: UpdateCounselorCommand = new UpdateCounselorCommand({
      counselorId: request.counselorId,
      counselorType: request.counselorType,
      name: request.name,
      description: request.description,
      gender: request.counselorGender,
    });
    const counselor = await this.commandBus.execute(command);

    return create(UpdateCounselorResultSchema, {
      counselor: SchemaCounselsMapper.toCounselorProto(counselor),
    });
  }
}
