import mongoose from 'mongoose';

const CreditCardSchema = new mongoose.Schema({
  creditCardNumber: {
    type: String,
  },
  creditCardExpirationDate: {
    type: Date,
  },
  creditCardUsername: {
    type: String,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  languages: {
    type: [String],
  },
  description: {
    type: String,
  },
  pictureUrl: {
    type: String,
  },
  profession: {
    type: String,
  },
  creditCardInfo: {
    type: CreditCardSchema,
  },
});

export const UserDoc = mongoose.model('User', userSchema);
