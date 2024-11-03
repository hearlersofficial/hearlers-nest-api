export class Identifier<T> {
  constructor(private readonly value: T) {
    this.value = value;
  }

  equals(id: Identifier<T>): boolean {
    if (!(id instanceof Identifier)) {
      return false;
    }

    return id.getValue() === this.value;
  }

  getValue(): string {
    return String(this.value);
  }

  getNumber(): number {
    return Number(this.value);
  }

  isNewIdentifier(): boolean {
    return this.value === 0;
  }
}
