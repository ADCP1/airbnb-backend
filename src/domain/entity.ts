export abstract class Entity {
  public readonly id: string;

  constructor(id?: string) {
    this.id = id;
  }
}
