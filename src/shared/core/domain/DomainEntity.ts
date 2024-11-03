import { UniqueEntityID } from "~/src/shared/core/domain/UniqueEntityID";

interface DomainEntityProps {
  [index: string]: any;
}

export abstract class DomainEntity<T extends DomainEntityProps> {
  protected readonly props: T;
  private readonly _id: UniqueEntityID;

  protected constructor(props: T, id: UniqueEntityID) {
    this.props = { ...props };
    this._id = id;
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get propsValue(): T {
    return this.props;
  }
}
