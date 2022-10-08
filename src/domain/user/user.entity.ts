import { Entity } from '@domain';

export type UserArgs = {
  id?: string;
  username: string;
  password: string;
};

export class User extends Entity {
  public readonly username: string;
  public readonly password: string;

  constructor(args: UserArgs) {
    super(args.id);
    this.username = args.username;
    this.password = args.password;
  }
}
