import { Entity } from '@domain';

export type UserArgs = {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  password: string;
};

export class User extends Entity {
  public readonly name: string;
  public readonly lastName: string;
  public readonly email: string;
  public readonly phone: string;
  public readonly dateOfBirth: Date;
  public readonly password: string;

  constructor(args: UserArgs) {
    super(args.id);
    this.name = args.name;
    this.lastName = args.lastName;
    this.email = args.email;
    this.phone = args.phone;
    this.dateOfBirth = args.dateOfBirth;
    this.password = args.password;
  }
}
