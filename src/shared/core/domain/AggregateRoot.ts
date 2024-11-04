import { DomainEntity } from "~/src/shared/core/domain/DomainEntity";
import { UniqueEntityId } from "~/src/shared/core/domain/UniqueEntityId";

export interface AggregateRootNewProps {}

export abstract class AggregateRoot<T, NewProps extends AggregateRootNewProps> extends DomainEntity<T, NewProps> {
  protected constructor(props: T, id?: UniqueEntityId) {
    super(props, id);
  }
}
