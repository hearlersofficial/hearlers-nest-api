import { fakerKO as faker } from "@faker-js/faker";
import { UniqueEntityID } from "~/src/shared/core/domain/UniqueEntityID";

describe("UniqueEntityID", (): void => {
  it("전달된 값이 반환", (): void => {
    const randomString: string = faker.lorem.word();
    const randomInt: number = faker.number.int({ min: 1, max: 100 });

    const uniqueEntityID: UniqueEntityID = new UniqueEntityID(randomString);
    const uniqueEntityID2: UniqueEntityID = new UniqueEntityID(randomInt);

    expect(uniqueEntityID.getValue()).toEqual(randomString);
    expect(uniqueEntityID2.getNumber()).toEqual(randomInt);
  });

  it("전달된 값이 없이 생성된 경우 0을 반환", (): void => {
    const uniqueEntityID: UniqueEntityID = new UniqueEntityID();

    expect(uniqueEntityID).toBeDefined();
    expect(uniqueEntityID.getValue()).toEqual("0");
  });
});
