import mongoose from 'mongoose';

const incomeSchema = mongoose.Schema(
  {
    ResidentName: {
      type: String,
      required: true,
    },
    HouseNo: {
      type: String,
    },
    account: {
      type: String,
      enum: ['rec', 'masjid'],  // Example accounts only send 'rec' or 'masjid'
      required: true
    },
    Amount: {
      type: String,
      required: true,
    },
    Ownership: {
      type: String,
    },
    Type: {
      type: String,
    },
    Reason: {
      type: String,
    },
    date: {
      type: Date,
    },
    fileUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export const incomeModel = mongoose.model('Income', incomeSchema);
