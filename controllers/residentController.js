// import { residentModel } from "../models/residentModel.js";

import { residentModel } from "../models/residentModel.js";
import validator from "validator";

// ------------------------------- creating resident -----------------------------------------
export const residentController = async (req, res, next) => {
  const { FullName, Email, Phone, HouseNumber, CNIC, role, resAvatar } =
    req.body;

  if (!FullName || !Email || !Phone || !HouseNumber || !CNIC) {
    return res.status(400).json({
      success: false,
      message: "Please enter all fields of form to continue",
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
    role,
    resAvatar,
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
      message: "Single resident deleted",
      resident,
    });
  } catch (err) {
    console.log(err);
  }
};

//---------------------------------- updating a single resident -----------------------
export const updateResident = async (req, res) => {
  try {
    const { FullName, Email, Phone, HouseNumber, CNIC, role, resAvatar } =
      req.body;
    const { id } = req.params;

    if (!FullName || !Email || !Phone || !HouseNumber || !CNIC) {
      return res.status(400).json({
        success: false,
        message: "Please enter all fields of form to continue",
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

    const resident = await residentModel.findByIdAndUpdate(id, {
      FullName,
      Email,
      Phone,
      HouseNumber,
      CNIC,
      role,
      resAvatar,
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
