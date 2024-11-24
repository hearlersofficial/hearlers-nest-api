import { fromBinary } from "@bufbuild/protobuf";
import { Controller, Inject, OnModuleInit } from "@nestjs/common";
import { ClientKafka, Ctx, EventPattern, KafkaContext, Payload } from "@nestjs/microservices";
import { UserUpdatedEvent } from "~/src/aggregates/users/domain/events/UserUpdatedEvents";
import { UserUpdatedPayload, UserUpdatedPayloadSchema } from "~/src/gen/v1/message/user_pb";
import { KAFKA_CLIENT } from "~/src/shared/core/infrastructure/Config";

@Controller()
export class UsersMessageController implements OnModuleInit {
  constructor(@Inject(KAFKA_CLIENT) private readonly kafkaClient: ClientKafka) {}

  async onModuleInit() {}

  @EventPattern(UserUpdatedEvent.topic)
  handleUserUpdated(@Payload() message, @Ctx() context: KafkaContext): void {
    const numberArray = message.split(",").map(Number);
    const uint8Array = new Uint8Array(numberArray);
    const convertedPayload: UserUpdatedPayload = fromBinary(UserUpdatedPayloadSchema, uint8Array);
    console.log(convertedPayload);
    console.log(context);
  }
}
