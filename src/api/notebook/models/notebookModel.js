import mongoose from 'mongoose';
import { CoreSchema } from '../../../utils/core-schema.js';

const notebookSchema = new CoreSchema({
  brand: {
    type: String,
    required: true,
  },
  processor: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  RAM: {
    type: String,
    required: true,
  },
});

export const Notebook = mongoose.model('Notebook', notebookSchema);
