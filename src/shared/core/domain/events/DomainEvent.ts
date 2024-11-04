import { UniqueEntityId } from "~/src/shared/core/domain/UniqueEntityId";

export interface DomainEvent {
  dateTimeOccurred: Date;
  getAggregateId(): UniqueEntityId;
}

export abstract class BaseDomainEvent implements DomainEvent {
  public dateTimeOccurred: Date;
  protected aggregateId: UniqueEntityId;

  constructor(aggregateId: UniqueEntityId) {
    this.dateTimeOccurred = new Date();
    this.aggregateId = aggregateId;
  }

  getAggregateId(): UniqueEntityId {
    return this.aggregateId;
  }
}
