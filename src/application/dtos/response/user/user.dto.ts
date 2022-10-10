import { CreditCardInfo } from '@domain/user';

export type UserDto = {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  location?: string;
  languages?: string[];
  description?: string;
  pictureUrl?: string;
  profession?: string;
  creditCardInfo?: CreditCardInfo;
};
