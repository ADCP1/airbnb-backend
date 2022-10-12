export abstract class ValueObject {
  protected setReadonlyProperty<T extends keyof this>(
    property: T,
    value: this[T],
  ): void {
    this[property] = value;
  }
}
