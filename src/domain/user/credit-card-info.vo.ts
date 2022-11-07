import { ValueObject } from '@domain/value-object';

export type CreditCardInfoArgs = {
  number: string;
  expirationDate: string;
  code: string;
};

export class CreditCardInfo extends ValueObject {
  public readonly number: string;
  public readonly expirationDate: string;
  public readonly code: string;

  constructor(args: CreditCardInfoArgs) {
    super();
    this.number = args.number;
    this.expirationDate = args.expirationDate;
    this.code = args.code;
  }
}
