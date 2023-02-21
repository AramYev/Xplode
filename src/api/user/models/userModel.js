import mongoose from 'mongoose';
import { CoreSchema } from '../../../utils/core-schema.js';

const userSchema = new CoreSchema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  mail: {
    type: String,
    required: true,
    unique: true,
  },
  isEmailVerified: {
    type: Boolean,
  },
});

export const User = mongoose.model('User', userSchema);
