import { DomainEvent } from "~/src/shared/core/domain/events/DomainEvent";
import { DomainEventBus } from "~/src/shared/core/domain/events/EventBus";

export interface EventPublisher {
  publish(event: DomainEvent): Promise<void>;
}

export class DomainEventPublisher implements EventPublisher {
  constructor(private readonly eventBus: DomainEventBus) {}

  async publish(event: DomainEvent): Promise<void> {
    await this.eventBus.publish(event);
  }
}
