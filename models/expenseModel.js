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
  },
  { timestamps: true }
);

export const expenseModel = mongoose.model("Expenses", expenseSchema);
