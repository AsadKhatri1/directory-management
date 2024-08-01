import mongoose from "mongoose";

const expenseSchema = mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },

    Amount: {
      type: String,
      required: true,
    },
    Type: {
      type: String,
    },
    fileUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export const expenseModel = mongoose.model("Expenses", expenseSchema);
