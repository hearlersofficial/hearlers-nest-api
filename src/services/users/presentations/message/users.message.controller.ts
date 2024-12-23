import { Controller, Inject, OnModuleInit } from "@nestjs/common";
import { ClientKafka, Ctx, EventPattern, KafkaContext, Payload } from "@nestjs/microservices";
import { UserUpdatedEvent } from "~/src/aggregates/users/domain/events/UserUpdatedEvents";
import { UserUpdatedPayloadSchema } from "~/src/gen/v1/message/user_pb";
import { KAFKA_CLIENT } from "~/src/shared/core/infrastructure/Config";
import { kafkaPayloadToProtoMessage } from "~/src/shared/utils/Proto.utils";

@Controller()
export class UsersMessageController implements OnModuleInit {
  constructor(@Inject(KAFKA_CLIENT) private readonly kafkaClient: ClientKafka) {}

  async onModuleInit() {}

  @EventPattern(UserUpdatedEvent.topic)
  handleUserUpdated(@Payload() payload: string, @Ctx() context: KafkaContext): void {
    const convertedPayload = kafkaPayloadToProtoMessage(payload, UserUpdatedPayloadSchema);
    console.log(convertedPayload);
    console.log(context);
  }
}
