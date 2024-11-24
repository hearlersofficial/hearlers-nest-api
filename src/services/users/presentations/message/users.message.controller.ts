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
  handleUserUpdated(@Payload() message: Uint8Array, @Ctx() context: KafkaContext): void {
    console.log(message);
    // const convertedPayload: UserUpdatedPayload = fromBinary(UserUpdatedPayloadSchema, message);
    // console.log(convertedPayload);
    console.log(context);
  }
}
