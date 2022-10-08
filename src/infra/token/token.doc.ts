import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

export const TokenDoc = mongoose.model('Token', tokenSchema);
