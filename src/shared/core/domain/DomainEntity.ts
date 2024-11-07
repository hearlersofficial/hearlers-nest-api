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

  protected static passFactory(): (props: any, id: UniqueEntityId) => any {
    throw new Error("Factory method must be implemented");
  }

  public static create(props: any, id: UniqueEntityId): Result<any> {
    if (!id) {
      return Result.fail("ID는 필수입니다");
    }
    const instance = this.passFactory()(props, id);
    const validationResult = instance.validateDomain();
    if (validationResult.isFailure) {
      return Result.fail(validationResult.error);
    }
    return Result.ok(instance);
  }

  public static createNew(newProps: any): Result<any> {
    const newId = new UniqueEntityId();
    const tempInstance = this.passFactory()({} as any, newId);
    const props = tempInstance.initializeEntityProps(newProps);
    return this.create(props, newId);
  }

  protected abstract initializeEntityProps(newProps: NewProps): Props;
  protected abstract validateDomain(): Result<void>;

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
    return this.id.equals(other?.id);
  }
}
