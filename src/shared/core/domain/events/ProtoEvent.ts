import { DescMessage, fromJson, MessageShape, toBinary, toJson } from "@bufbuild/protobuf";
import { BaseDomainEvent } from "~/src/shared/core/domain/events/DomainEvent";
import { UniqueEntityId } from "~/src/shared/core/domain/UniqueEntityId";

export abstract class ProtoEvent<T extends DescMessage> extends BaseDomainEvent {
  constructor(
    aggregateId: UniqueEntityId,
    protected readonly protoMessage: MessageShape<T>,
    protected readonly protoSchema: T,
  ) {
    super(aggregateId);
  }

  public getPayload(): MessageShape<T> {
    return this.protoMessage;
  }

  // proto 메시지를 바이트로 직렬화
  public serialize(): Uint8Array {
    return toBinary(this.protoSchema, this.protoMessage);
  }

  // proto 메시지를 JSON으로 직렬화
  public toJSON(): Record<string, any> {
    return toJson(this.protoSchema, this.protoMessage);
  }

  // JSON에서 proto 메시지로 역직렬화 (static 메서드)
  public static fromJSON<T extends DescMessage>(schema: T, json: Record<string, any>): MessageShape<T> {
    return fromJson(schema, json);
  }
}
