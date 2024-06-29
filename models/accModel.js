import mongoose from "mongoose";

const accSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },

    Balance: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const accModel = mongoose.model("Accounts", accSchema);
