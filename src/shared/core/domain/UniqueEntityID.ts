import { Identifier } from "~/src/shared/core/domain/Identifier";

export class UniqueEntityId extends Identifier<string | number> {
  constructor(id?: string | number) {
    super(id ? id : 0);
  }
}
