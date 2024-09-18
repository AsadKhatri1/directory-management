import mongoose from "mongoose";

import jwt from "jsonwebtoken";
const adminSchema = mongoose.Schema(
  {
    FullName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Phone: {
      type: String,
      required: true,
      minLength: 11,
    },
    role: {
      type: String,
      default: "1",
    },
  },
  { timestamps: true }
);

export const adminModel = mongoose.model("Admin", adminSchema);
