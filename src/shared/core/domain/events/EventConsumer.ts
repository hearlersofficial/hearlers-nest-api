import { DomainEvent } from "~/src/shared/core/domain/events/DomainEvent";

export interface EventConsumer {
  consume(eventName: string, handler: (event: DomainEvent) => Promise<void>): void;
}
