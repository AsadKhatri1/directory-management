import mongoose from "mongoose";
import validator from "validator";
// import jwt from "jsonwebtoken";

const vehicleSchema = mongoose.Schema({
  type: String,
  make: String,
  model: String,
  year: Number,
  colour: String,
  stickerNumber: String,
  registrationNumber: String,
});
const familyMemberSchema = mongoose.Schema({
  name: String,
  relation: String,
  cnic: String,
  dob: Date,
  occupation: String,
  number: String,
});

const residentSchema = mongoose.Schema(
  {
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
    Profession: {
      type: String,
    },
    Qualification: {
      type: String,
    },
    DOB: {
      type: Date,
    },
    NOCHolder: {
      type: String,
    },
    bAddress: {
      type: String,
    },
    officeTel: {
      type: String,
    },
    NOCIssue: {
      type: Date,
    },
    NOCNo: {
      type: String,
    },
    NOCNo: {
      type: String,
    },
    role: {
      type: String,
      default: "0",
    },

    paid: {
      type: Boolean,
      default: false,
    },
    relatives: [familyMemberSchema], // New field for family members
    vehicles: [vehicleSchema],
  },
  { timestamps: true }
);

export const residentModel = mongoose.model("Residents", residentSchema);
