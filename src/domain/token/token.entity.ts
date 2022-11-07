import { Entity } from '@domain/entity';

export type TokenArgs = {
  id?: string;
  key: string;
  value: string;
};

export class Token extends Entity {
  public key: string;
  public value: string;

  constructor(args: TokenArgs) {
    super(args.id);
    this.key = args.key;
    this.value = args.value;
  }
}
