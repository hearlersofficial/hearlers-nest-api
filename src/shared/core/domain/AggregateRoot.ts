import { DomainEntity } from "~/src/shared/core/domain/DomainEntity";
import { UniqueEntityId } from "~/src/shared/core/domain/UniqueEntityId";

export abstract class AggregateRoot<T> extends DomainEntity<T> {
  protected constructor(props: T, id?: UniqueEntityId) {
    super(props, id);
  }
}
