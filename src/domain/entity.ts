export abstract class Entity {
  public id: string | undefined;

  constructor(id?: string) {
    this.id = id;
  }
}
