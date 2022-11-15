import {
  getPaymentTypeValues,
  getReservationStatusValues,
} from '@domain/reservation';
import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  organizerId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
  },
  duration: {
    type: Number,
    required: true,
  },
  imagesUrls: {
    type: [String],
    required: true,
  },
  dates: {
    type: [Date],
    required: true,
  },
});

export const ExperienceDoc = mongoose.model('Experience', experienceSchema);
