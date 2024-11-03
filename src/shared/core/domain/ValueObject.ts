import { UniqueEntityID } from "~/src/shared/core/domain/UniqueEntityID";

interface ValueObjectProps {
  [index: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProps> {
  protected readonly props: T;
  private readonly _id?: UniqueEntityID;

  protected constructor(props: T, id?: UniqueEntityID) {
    this.props = { ...props };
    if (id) {
      this._id = id;
    }
  }

  public equals(other?: ValueObject<T>): boolean {
    if (this.id && other.id) {
      return this.id.equals(other.id);
    }
    if (other === null || other === undefined) {
      return false;
    }

    return JSON.stringify(this.props) === JSON.stringify(other.props);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get propsValue(): T {
    return this.props;
  }
}
