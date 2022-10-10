import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
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
  creditCardNumber: {
    type: String,
  },
  creditCardExpirationDate: {
    type: Date,
  }, 
  creditCardUsername: {
    type: String,
  }
});

export const UserDoc = mongoose.model('User', userSchema);
