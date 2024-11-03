import { fakerKO as faker } from "@faker-js/faker";
import { AggregateRoot } from "~/src/shared/core/domain/AggregateRoot";
import { UniqueEntityID } from "~/src/shared/core/domain/UniqueEntityID";

interface AggregateObjectProps {
  foo: string;
}

class AbstractClass extends AggregateRoot<AggregateObjectProps> {
  constructor(props: AggregateObjectProps, id: UniqueEntityID) {
    super(props, id);
  }

  get foo(): string {
    return this.props.foo;
  }
}

describe("AggregateRoot with AbstractClass", (): void => {
  it("id 와 foo 값을 반환", (): void => {
    const foo = faker.lorem.word();
    const uniqueEntityIDValue: number = faker.number.int({ min: 1, max: 100 });

    const abstractClass: AbstractClass = new AbstractClass({ foo }, new UniqueEntityID(uniqueEntityIDValue));

    expect(abstractClass.id).toBeDefined();
    expect(abstractClass.id.getNumber()).toEqual(uniqueEntityIDValue);
    expect(abstractClass.foo).toEqual(foo);
  });
});
