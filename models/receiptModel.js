import mongoose from "mongoose";

const receiptSchema = mongoose.Schema(
  {
    receiptId: {
      type: String,
      required: true,
      unique: true,
    },
    residentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Residents",
      required: true,
    },
    residentName: {
      type: String,
      required: true,
    },
    houseNumber: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    numberOfMonths: {
      type: Number,
      required: true,
    },
    monthsPaid: {
      type: [String],
      default: [],
    },
    paymentMode: {
      type: String,
      default: "N/A",
    },
  },
  { timestamps: true }
);

export const receiptModel = mongoose.model("Receipts", receiptSchema);
