import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  location: String,
  languages: [String],
  description: String,
  profession: String,
  pictureUrl: String,
  creditCardInfo: {
    number: {
      type: String,
      required: true,
    },
    expirationDate: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
});

export const UserDoc = mongoose.model('User', userSchema);
