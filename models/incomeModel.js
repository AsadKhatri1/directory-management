import mongoose from "mongoose";

const incomeSchema = mongoose.Schema(
  {
    ResidentName: {
      type: String,
      required: true,
    },
    HouseNo: {
      type: String,
    },

    Amount: {
      type: String,
      required: true,
    },
    Reason: {
      type: String,
    },
  },
  { timestamps: true }
);

export const incomeModel = mongoose.model("Income", incomeSchema);
