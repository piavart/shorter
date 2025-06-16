import mongoose, { Document, Schema } from 'mongoose';

export interface IShortCode extends Document {
  code: string;
  url: string;
  clicksCount: number;
  createdAt: Date;
}

const ShortCodeSchema: Schema = new Schema(
  {
    code: {
      type: String,
      required: true,
      // Must create unique index
      unique: true,
    },
    url: {
      type: String,
      required: true,
    },
    clicksCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: { createdAt: true } },
);

export const ShortCodeModel = mongoose.model<IShortCode>(
  'ShortCode',
  ShortCodeSchema,
  'short-codes',
);
