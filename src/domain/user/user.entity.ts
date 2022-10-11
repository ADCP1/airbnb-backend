import { Entity } from '@domain';

export type UserArgs = {
  id?: string;
  email: string;
  password: string;
  name: string;
  lastName: string;
  phone: string;
  dateOfBirth: Date;
  location?: string;
  languages?: string[];
  description?: string;
  profession?: string;
  pictureUrl?: string;
};

export class User extends Entity {
  public readonly name: string;
  public readonly lastName: string;
  public readonly email: string;
  public readonly phone: string;
  public readonly dateOfBirth: Date;
  public readonly password: string;
  public readonly location?: string;
  public readonly languages?: string[];
  public readonly description?: string;
  public readonly profession?: string;
  public readonly pictureUrl?: string;

  constructor(args: UserArgs) {
    super(args.id);
    this.name = args.name;
    this.lastName = args.lastName;
    this.email = args.email;
    this.phone = args.phone;
    this.dateOfBirth = args.dateOfBirth;
    this.password = args.password;
    this.location = args.location;
    this.languages = args.languages;
    this.description = args.description;
    this.profession = args.profession;
    this.pictureUrl = args.pictureUrl;
  }
}
