import { DomainEvent } from "~/src/shared/core/domain/events/DomainEvent";
import { DomainEventBus } from "~/src/shared/core/domain/events/EventBus";
import { EventConsumer } from "~/src/shared/core/domain/events/EventConsumer";

export class InMemoryEventConsumer implements EventConsumer {
  constructor(private readonly eventBus: DomainEventBus) {}

  consume(eventName: string, handler: (event: DomainEvent) => Promise<void>): void {
    this.eventBus.register(eventName, {
      handle: handler,
    });
  }
}
