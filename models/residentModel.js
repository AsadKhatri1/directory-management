import mongoose from "mongoose";
import validator from "validator";

const vehicleSchema = mongoose.Schema({
  type: String,
  make: String,
  model: String,
  year: Number,
  colour: String,
  stickerNumber: String,
  registrationNumber: String,
  paperDocument: String,
});
const familyMemberSchema = mongoose.Schema({
  name: String,
  relation: String,
  cnic: String,
  dob: Date,
  occupation: String,
  number: String,
  photoUrl: String,
  cnicUrl: String,
});
const maidsSchema = mongoose.Schema({
  name: String,
  guardian: String,
  cnic: String,
  dob: Date,
  address: String,
  number: String,
  cnicUrl: String,
  cantPassUrl: String,
});
const tanentSchema = mongoose.Schema({
  name: String,
  cnic: String,
  dob: Date,
  occupation: String,
  number: String,
  nocIssue: {
    type: Date,
  },
  nocNo: {
    type: String,
  },
  photoUrl: String,
  cnicUrl: String,
  nocUrl: String,
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
    role: {
      type: String,
      default: "0",
    },
    paid: {
      type: Boolean,
      default: false,
    },
    paidExpiry: {
      type: Date,
      default: null,
    },
    relatives: [familyMemberSchema],
    vehicles: [vehicleSchema],
    maids: [maidsSchema],
    tanents: [tanentSchema],
    Photo: String,
    CnicFile: String,
    NocFile: String,
    CantFile: String,
    VerificationFile: String,
    LisenceFile: String,
  },
  { timestamps: true }
);

export const residentModel = mongoose.model("Residents", residentSchema);
