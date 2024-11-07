import { fakerKO as faker } from "@faker-js/faker";
import { AggregateRoot } from "./AggregateRoot";
import { DomainEntityNewProps } from "./DomainEntity";
import { UniqueEntityId } from "./UniqueEntityId";
import { Result } from "./Result";

interface TestAggregateProps {
  name: string;
}

interface TestAggregateNewProps extends DomainEntityNewProps {
  name: string;
}

class TestAggregate extends AggregateRoot<TestAggregateProps, TestAggregateNewProps> {
  private constructor(props: TestAggregateProps, id: UniqueEntityId) {
    super(props, id);
  }

  protected static override passFactory() {
    return (props: TestAggregateProps, id: UniqueEntityId): TestAggregate => new TestAggregate(props, id);
  }

  protected override initializeEntityProps(newProps: TestAggregateNewProps): TestAggregateProps {
    return {
      name: newProps.name,
    };
  }

  protected validateDomain(): Result<void> {
    if (!this.props.name) {
      return Result.fail("이름은 필수입니다");
    }
    return Result.ok();
  }

  get name(): string {
    return this.props.name;
  }
}

describe("AggregateRoot", () => {
  it("Aggregate를 생성할 수 있다", () => {
    const name = faker.person.firstName();
    const result = TestAggregate.createNew({ name });

    expect(result.isSuccess).toBe(true);
    expect(result.value).toBeDefined();
    if (result.isSuccess && result.value) {
      expect(result.value.name).toBe(name);
      expect(result.value.id.getNumber()).toBe(0);
    }
  });
});
