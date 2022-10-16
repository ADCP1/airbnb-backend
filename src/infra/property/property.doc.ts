import { PropertyAmenity } from '@domain/property';
import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  imagesUrls: [
    {
      type: String,
      required: true,
    },
  ], // TODO verify that this array syntax is right
  location: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  services: [PropertyAmenity],
  capacity: {
    type: Number,
    required: true,
  },
  roomAmount: {
    type: Number,
    required: true,
  },
  toiletAmount: {
    type: Number,
    required: true,
  },
  // In squared meters
  surfaceArea: {
    type: Number,
    required: true,
  },
  rules: [String],
  isPetFriendly: Boolean,
});

export const PropertyDoc = mongoose.model('Property', propertySchema);
