import mongoose from 'mongoose';

const violationSchema = mongoose.Schema(
  {
    HouseNo: {
      type: String,
      required: true,
    },

    Resident: {
      type: String,
      required: true,
    },
    Title: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    Status: {
      type: String,
      enum: ['new', 'open', 'resolved'],
      default: 'new',
    },
  },
  { timestamps: true }
);

export const violationModel = mongoose.model('Violations', violationSchema);
