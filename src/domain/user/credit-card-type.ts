import { DomainException } from '@shared';

export enum CreditCardType {
  Visa = 'visa',
  Mastercard = 'mastercard',
  Amex = 'amex',
}

const digitToTypeMap: Map<string, CreditCardType> = new Map([
  ['3', CreditCardType.Amex],
  ['4', CreditCardType.Visa],
  ['5', CreditCardType.Mastercard],
]);

export function getCreditCardType(number: string): CreditCardType {
  const creditCardType = digitToTypeMap.get(number[0]);
  if (!creditCardType) throw new DomainException('Invalid credit card issuer');
  return creditCardType;
}
