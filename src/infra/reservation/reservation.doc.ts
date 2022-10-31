import { getReservationStatusValues } from '@domain/reservation';
import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  propertyId: {
    type: String,
    required: true,
  },
  guestId: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: getReservationStatusValues(),
    required: true,
  },
  amountOfGuests: {
    type: Number,
    required: true,
  },
});

export const ReservationDoc = mongoose.model('Reservation', reservationSchema);
