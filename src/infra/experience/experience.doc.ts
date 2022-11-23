import {
  getExperienceAccessibilityValues,
  getExperienceCategoriesValues,
  getExperienceLanguagesValues,
  getExperienceTypesValues,
} from '@domain/experience';
import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  ownerId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: getExperienceTypesValues(),
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
  date: {
    type: Date,
    required: true,
  },
  languages: {
    type: [String],
    enum: getExperienceLanguagesValues(),
    required: true,
  },
  accessibility: {
    type: [String],
    enum: getExperienceAccessibilityValues(),
    required: true,
  },
  category: {
    type: String,
    enum: getExperienceCategoriesValues(),
    required: true,
  },
});

export const ExperienceDoc = mongoose.model('Experience', experienceSchema);
