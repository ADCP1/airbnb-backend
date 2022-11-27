import { getResourceTypeValues } from '@domain/review';
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    resourceId: {
      type: String,
      required: true,
    },
    resourceType: {
      type: String,
      enum: getResourceTypeValues(),
      required: true,
    },
    reviewerId: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export const ReviewDoc = mongoose.model('Review', reviewSchema);
