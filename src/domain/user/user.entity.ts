import { Entity } from '@domain';

export type UserArgs = {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  password: string;
  location?: string;
  languages?: string[];
  description?: string;
  pictureUrl?: string;
  profession?: string;
  creditCardNumber?: string;
  creditCardExpirationDate?: Date;
  creditCardUsername?: string;
};

export class User extends Entity {
  public readonly name: string;
  public readonly lastName: string;
  public readonly email: string;
  public readonly phone: string;
  public readonly dateOfBirth: Date;
  public readonly password: string;
  public readonly location: string;
  public readonly languages: string[];
  public readonly description: string;
  public readonly pictureUrl: string;
  public readonly profession: string;
  public readonly creditCardNumber: string;
  public readonly creditCardExpirationDate: Date;
  public readonly creditCardUsername: string;

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
    this.pictureUrl = args.pictureUrl;
    this.profession = args.profession;
    this.creditCardNumber = args.creditCardNumber;
    this.creditCardExpirationDate = args.creditCardExpirationDate;
    this.creditCardUsername = args.creditCardUsername;
  }
}
