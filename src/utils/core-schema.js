import { Schema } from 'mongoose';

export class CoreSchema extends Schema {
  constructor(schema) {
    super(
      {
        ...schema,
        deletedAt: {
          type: Date,
        },
        updatedAt: {
          type: Date,
        },
      },
      { timestamps: true },
    );
  }
}
