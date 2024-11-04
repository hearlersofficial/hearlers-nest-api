import { DomainEvent } from "~/src/shared/core/domain/events/DomainEvent";

export interface EventHandler<T extends DomainEvent> {
  handle(event: T): Promise<void>;
}

export class DomainEventBus {
  private static instance: DomainEventBus;
  private handlers: Map<string, EventHandler<any>[]> = new Map();

  private constructor() {}

  public static getInstance(): DomainEventBus {
    if (!DomainEventBus.instance) {
      DomainEventBus.instance = new DomainEventBus();
    }
    return DomainEventBus.instance;
  }

  public register<T extends DomainEvent>(eventName: string, handler: EventHandler<T>): void {
    const handlers = this.handlers.get(eventName) || [];
    handlers.push(handler);
    this.handlers.set(eventName, handlers);
  }

  public async publish(event: DomainEvent): Promise<void> {
    const handlers = this.handlers.get(event.constructor.name) || [];
    await Promise.all(handlers.map((handler) => handler.handle(event)));
  }
}
