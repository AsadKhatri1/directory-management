import mongoose from "mongoose";
import validator from "validator";

const residentSchema = mongoose.Schema({
  FullName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Enter valid email"],
  },
  Phone: {
    type: String,
    required: true,
    minLength: [11, "Please enter at least 11 characters"],
  },
  HouseNumber: {
    type: String,
    required: true,
  },
  CNIC: {
    type: String,
    required: true,
  },
});

export const residentModel = mongoose.model("Residents", residentSchema);
