import { getPropertyAmenityValues } from '@domain/property';
import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  ownerId: {
    type: String,
    required: true,
  },
  imagesUrls: [String],
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
  amenities: {
    type: [String],
    enum: getPropertyAmenityValues(),
  },
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

propertySchema.index({ location: 'text', title: 'text', description: 'text' });

export const PropertyDoc = mongoose.model('Property', propertySchema);
