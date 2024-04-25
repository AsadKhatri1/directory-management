// import { residentModel } from "../models/residentModel.js";

import { residentModel } from "../models/residentModel.js";
import validator from "validator";
// ----------------- wrapping the whole controller function with check errors middleware

export const residentController = async (req, res, next) => {
  const { FullName, Email, Phone, HouseNumber, CNIC, role, resAvatar } =
    req.body;

  if (!FullName || !Email || !Phone || !HouseNumber || !CNIC || !role) {
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
