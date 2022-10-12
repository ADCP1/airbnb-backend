import { CreditCardType } from '@domain/user';

export type UserDto = {
  email: string;
  name: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  location?: string;
  languages?: string[];
  description?: string;
  profession?: string;
  pictureUrl?: string;
  creditCardInfo?: {
    type: CreditCardType;
    lastDigits: string;
  };
};
