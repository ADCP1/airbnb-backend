export enum PaymentType {
  CreditCard = 'credit-card',
  DebitCard = 'debit-card',
  bankTransfer = 'bank-transfer',
}

export function getPaymentTypeValues(): PaymentType[] {
  return Object.values(PaymentType);
}
