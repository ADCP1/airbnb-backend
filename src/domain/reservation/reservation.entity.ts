import { Entity } from '@domain';

import { PaymentType } from './payment-type';
import { ReservationStatus } from './reservation-status';

export type ReservationArgs = {
  id?: string;
  reservableId?: string;
  guestId: string;
  startDate: Date;
  endDate: Date;
  status: ReservationStatus;
  amountOfGuests: number;
  paymentType: PaymentType;
  reservableType?: string;
};

export class Reservation extends Entity {
  public reservableId: string;
  public guestId: string;
  public startDate: Date;
  public endDate: Date;
  public status: ReservationStatus;
  public amountOfGuests: number;
  public paymentType: PaymentType;
  public reservableType: string | undefined;

  constructor(args: ReservationArgs) {
    super(args.id);
    this.reservableId = args.reservableId!;
    this.guestId = args.guestId;
    this.startDate = args.startDate;
    this.endDate = args.endDate;
    this.status = args.status;
    this.amountOfGuests = args.amountOfGuests;
    this.paymentType = args.paymentType;
    this.reservableType = args.reservableType;
  }
}
