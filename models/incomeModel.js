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
  },
  { timestamps: true }
);

export const incomeModel = mongoose.model("Income", incomeSchema);
