import { toBinary } from "@bufbuild/protobuf";
import { CounselMessageCreatedPayload, CounselMessageCreatedPayloadSchema } from "~/src/gen/v1/message/counsel_pb";
import { DomainEvent } from "~/src/shared/core/domain/events/DomainEvent";

// 유저 도메인에서 사용할 클래스
export class UsersCounselMessageCreatedEvent extends DomainEvent {
  static readonly topic = "counsel.message.created";
  public readonly payload: CounselMessageCreatedPayload;
  public readonly binary: Uint8Array;

  constructor(payload: CounselMessageCreatedPayload) {
    super();
    this.payload = payload;
    this.binary = toBinary(CounselMessageCreatedPayloadSchema, payload, { writeUnknownFields: false });
  }
}
