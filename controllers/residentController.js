// import { residentModel } from "../models/residentModel.js";

import { residentModel } from "../models/residentModel.js";
import validator from "validator";

// ------------------------------- creating resident -----------------------------------------
export const residentController = async (req, res, next) => {
  const {
    FullName,
    Email,
    Phone,
    HouseNumber,
    CNIC,
    Profession,
    Qualification,
    DOB,
    NOCHolder,
    bAddress,
    officeTel,
    NOCIssue,
    NOCNo,
    vehicles,
    relatives,
    maids,
    tanents,
    Photo,
    CnicFile,
    NocFile,
    CantFile,
    VerificationFile,
    LisenceFile,
  } = req.body;

  if (!FullName || !Email || !Phone || !HouseNumber || !CNIC || !Photo) {
    return res.status(400).json({
      success: false,
      message: "Please enter all required fields of form to continue",
    });
  }
  if (Phone.length < 11) {
    return res.status(400).json({
      success: false,
      message: "Phone number length should not be less than 11",
    });
  }
  if (!validator.isEmail(Email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter valid email",
    });
  }

  const userExists = await residentModel.findOne({ Email: Email });
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  const newResident = new residentModel({
    FullName,
    Email,
    Phone,
    HouseNumber,
    CNIC,
    Profession,
    Qualification,
    DOB,
    NOCHolder,
    bAddress,
    officeTel,
    NOCIssue,
    NOCNo,
    vehicles,
    relatives,
    maids,
    tanents,
    Photo,
    CnicFile,
    NocFile,
    CantFile,
    VerificationFile,
    LisenceFile,
  });

  await newResident.save();
  return res.status(200).send({
    success: true,
    message: "New resident registered succesfully",
    newResident,
  });
};

//---------------------------------- getting all residents -----------------------
export const allResidents = async (req, res) => {
  try {
    const residents = await residentModel.find();
    if (!residents) {
      return res.status(400).send({
        success: false,
        message: "No resident found",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "All residents list",
        residents,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

//---------------------------------- getting single resident -----------------------
export const resident = async (req, res) => {
  try {
    const { id } = req.params;
    const resident = await residentModel.findById(id);
    if (!resident) {
      return res.status(400).send({
        success: false,
        message: "No resident found",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Single resident found",
        resident,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

//---------------------------------- deleting a single resident -----------------------
export const deleteResident = async (req, res) => {
  try {
    const { id } = req.params;
    const resident = await residentModel.findByIdAndDelete(id);

    return res.status(200).send({
      success: true,
      message: "Resident deleted",
      resident,
    });
  } catch (err) {
    console.log(err);
  }
};

//---------------------------------- updating a single resident -----------------------
export const updateResident = async (req, res) => {
  try {
    const { paid } = req.body;
    const { id } = req.params;

    if (!paid) {
      return res.status(400).json({
        success: false,
        message: "Please fill payment status",
      });
    }

    const resident = await residentModel.findByIdAndUpdate(id, {
      paid,
    });

    return res.status(200).send({
      success: true,
      message: "Resident updated",
      resident,
    });
  } catch (err) {
    console.log(err);
  }
};

// ---------------- search API ------------------------

// export const searchResident = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) - 1 || 0;
//     const limit = parseInt(req.query.limit) || 10;
//     const search = req.query.search || "";
//     const residents = await residentModel
//       .find({ name: { $regex: search, $option: "i" } })
//       .skip(page * limit)
//       .limit(limit);

//     return res.status(200).json({
//       success: true,
//       message: "Searched queries",
//       residents,
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ Message: "Internal server error" });
//   }
// };

export const slipCreate = async (req, res) => {
  try {
    const { residentId } = req.params;
    const resident = await residentModel.findById(residentId);
    // const resident = await residentModel.findById(residentId);
    // Logic to generate the fee slip
    // Calculate total fee based on the fixed monthly fee and the number of months
    const numberOfMonths = req.body.numberOfMonths;
    const monthlyFee = 2000;
    const totalFee = numberOfMonths * monthlyFee;
    // Save the fee slip to the database or perform any other necessary actions
    // Return success message or fee slip data

    res.status(200).json({
      success: true,
      message: "Fee slip generated successfully",
      resident,
      totalFee,
      numberOfMonths,
    });
  } catch (error) {
    console.error("Error generating fee slip:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to generate fee slip" });
  }
};
