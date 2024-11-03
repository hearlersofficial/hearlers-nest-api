import { Identifier } from "~/src/shared/core/domain/Identifier";

export class UniqueEntityID extends Identifier<string | number> {
  constructor(id?: string | number) {
    super(id ? id : 0);
  }
}
