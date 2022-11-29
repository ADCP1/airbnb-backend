import {
  getPaymentTypeValues,
  getReservableTypeValues,
  getReservationStatusValues,
} from '@domain/reservation';
import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  // Can reference either a property or an experience
  reservableId: {
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
  paymentType: {
    type: String,
    enum: getPaymentTypeValues(),
    required: true,
  },
  reservableType: {
    type: String,
    enum: getReservableTypeValues(),
    required: true,
  },
});

export const ReservationDoc = mongoose.model('Reservation', reservationSchema);
