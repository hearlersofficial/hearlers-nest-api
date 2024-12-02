import { create } from "@bufbuild/protobuf";
import { CounselMessages } from "~/src/aggregates/counselMessages/domain/CounselMessages";
import { CounselPrompts } from "~/src/aggregates/counselPrompts/domain/CounselPrompts";
import { Counsels } from "~/src/aggregates/counsels/domain/Counsels";
import { Counsel, CounselMessage, CounselMessageSchema, CounselPrompt, CounselPromptSchema, CounselSchema } from "~/src/gen/v1/model/counsel_pb";
import { TimestampUtils } from "~/src/shared/utils/Date.utils";

export class SchemaCounselsMapper {
  static toCounselProto(counsel: Counsels): Counsel {
    return create(CounselSchema, {
      id: counsel.id.getNumber(),
      userId: counsel.userId,
      counselorType: counsel.counselorType,
      lastMessage: counsel.lastMessage,
      lastChatedAt: counsel.lastChatedAt ? TimestampUtils.dayjsToTimestamp(counsel.lastChatedAt) : null,
      createdAt: TimestampUtils.dayjsToTimestamp(counsel.createdAt),
      updatedAt: TimestampUtils.dayjsToTimestamp(counsel.updatedAt),
      deletedAt: counsel.deletedAt ? TimestampUtils.dayjsToTimestamp(counsel.deletedAt) : null,
    });
  }

  static toCounselMessageProto(counselMessage: CounselMessages): CounselMessage {
    return create(CounselMessageSchema, {
      id: counselMessage.id.getNumber(),
      counselId: counselMessage.counselId.getNumber(),
      message: counselMessage.message,
      isUserMessage: counselMessage.isUserMessage,
      createdAt: TimestampUtils.dayjsToTimestamp(counselMessage.createdAt),
      updatedAt: TimestampUtils.dayjsToTimestamp(counselMessage.updatedAt),
      deletedAt: counselMessage.deletedAt ? TimestampUtils.dayjsToTimestamp(counselMessage.deletedAt) : null,
    });
  }

  static toCounselPromptProto(counselPrompt: CounselPrompts): CounselPrompt {
    return create(CounselPromptSchema, {
      id: counselPrompt.id.getNumber(),
      persona: counselPrompt.persona,
      context: counselPrompt.context,
      instruction: counselPrompt.instruction,
      tone: counselPrompt.tone,
      additionalPrompt: counselPrompt.additionalPrompt,
      promptType: counselPrompt.promptType,
      description: counselPrompt.description,
      version: counselPrompt.version,
      createdAt: TimestampUtils.dayjsToTimestamp(counselPrompt.createdAt),
      updatedAt: TimestampUtils.dayjsToTimestamp(counselPrompt.updatedAt),
      deletedAt: counselPrompt.deletedAt ? TimestampUtils.dayjsToTimestamp(counselPrompt.deletedAt) : null,
    });
  }
}
