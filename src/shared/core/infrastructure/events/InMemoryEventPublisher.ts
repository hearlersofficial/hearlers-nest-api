import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "eventemitter2";
import { DomainEvent } from "~/src/shared/core/domain/events/DomainEvent";
import { EventPublisher } from "~/src/shared/core/domain/events/EventPublisher";

@Injectable()
export class InMemoryEventPublisher implements EventPublisher {
  constructor(private eventEmitter: EventEmitter2) {}

  async publish(event: DomainEvent): Promise<void> {
    const eventName = event.constructor.name;
    await this.eventEmitter.emitAsync(`${event.getAggregateId().getValue()}.${eventName}`, event);
  }
}
