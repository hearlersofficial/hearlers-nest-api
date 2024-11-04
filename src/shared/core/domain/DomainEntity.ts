import { DomainEvent } from "~/src/shared/core/domain/events/DomainEvent";
import { UniqueEntityId } from "~/src/shared/core/domain/UniqueEntityId";
import { Result } from "~/src/shared/core/domain/Result";

export interface DomainEntityNewProps {}

export abstract class DomainEntity<Props, NewProps extends DomainEntityNewProps> {
  protected readonly _id: UniqueEntityId;
  protected props: Props;
  private _domainEvents: DomainEvent[] = [];

  protected constructor(props: Props, id: UniqueEntityId) {
    this._id = id;
    this.props = props;
  }

  // 자식 클래스에서 반드시 구현해야 하는 메서드들
  protected abstract convertToEntityProps(newProps: NewProps): Props;
  protected abstract validateDomain(): Result<void>;

  protected static createEntityInstance<T extends DomainEntity<any, any>>(
    props: any,
    id: UniqueEntityId,
    factory: (p: any, i: UniqueEntityId) => T,
  ): T {
    return factory(props, id);
  }

  protected static createEntityProps<T extends DomainEntity<any, any>>(instance: T, newProps: any): any {
    return instance.convertToEntityProps(newProps);
  }

  protected static createChild<E extends DomainEntity<any, any>>(
    props: any,
    id: UniqueEntityId,
    factory: (p: any, i: UniqueEntityId) => E,
  ): Result<E> {
    if (!id) {
      return Result.fail<E>("ID는 필수입니다");
    }
    const instance = factory(props, id);
    const validationResult = instance.validateDomain();
    if (validationResult.isFailure) {
      return Result.fail<E>(validationResult.error);
    }
    return Result.ok<E>(instance);
  }

  protected static createNewChild<E extends DomainEntity<any, any>>(
    newProps: any,
    factory: (p: any, i: UniqueEntityId) => E,
  ): Result<E> {
    const newId = new UniqueEntityId(0);
    const tempInstance = factory({} as any, newId);
    const props = tempInstance.convertToEntityProps(newProps);
    return this.createChild(props, newId, factory);
  }

  public isNew(): boolean {
    return this._id.isNewIdentifier();
  }

  get id(): UniqueEntityId {
    return this._id;
  }

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }

  public equals(other?: DomainEntity<Props, NewProps>): boolean {
    return this.id.equals(other.id);
  }

  private static isEntity(v: any): v is DomainEntity<any, any> {
    return v instanceof DomainEntity;
  }
}
