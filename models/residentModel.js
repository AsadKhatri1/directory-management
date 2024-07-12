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
