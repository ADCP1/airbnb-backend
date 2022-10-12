import { Entity } from '@domain';

import { CreditCardInfo } from './credit-card-info.vo';

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
  creditCardInfo?: CreditCardInfo;
};

export class User extends Entity {
  public name: string;
  public lastName: string;
  public email: string;
  public phone: string;
  public dateOfBirth: Date;
  public password: string;
  public location?: string;
  public languages?: string[];
  public description?: string;
  public profession?: string;
  public pictureUrl?: string;
  public creditCardInfo?: CreditCardInfo;

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
    this.creditCardInfo = args.creditCardInfo;
  }
}
