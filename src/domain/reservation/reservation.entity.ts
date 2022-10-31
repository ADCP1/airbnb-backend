import { Entity } from '@domain';

import { ReservationStatus } from './reservation-status';

export type ReservationArgs = {
  id?: string;
  propertyId?: string;
  guestId: string;
  startDate: Date;
  endDate: Date;
  status: ReservationStatus;
  amountOfGuests: number;
};

export class Reservation extends Entity {
  public propertyId: string;
  public guestId: string;
  public startDate: Date;
  public endDate: Date;
  public status: ReservationStatus;
  public amountOfGuests: number;
  // public paymentType: PaymentType;

  constructor(args: ReservationArgs) {
    super(args.id);
    this.propertyId = args.propertyId!;
    this.guestId = args.guestId;
    this.startDate = args.startDate;
    this.endDate = args.endDate;
    this.status = args.status;
  }
}
