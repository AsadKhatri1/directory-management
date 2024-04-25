// import { residentModel } from "../models/residentModel.js";

import mongoose from "mongoose";
import { residentModel } from "../models/residentModel.js";

// ----------------- wrapping the whole controller function with check errors middleware

export const residentController = async (req, res, next) => {
  const { FullName, Email, Phone, HouseNumber, CNIC } = req.body;

  if (!FullName || !Email || !Phone || !HouseNumber || !CNIC) {
    return res.status(400).json({
      success: false,
      message: "Please enter all fields of form to continue",
    });
  }

  const newResident = await new residentModel({
    FullName,
    Email,
    Phone,
    HouseNumber,
    CNIC,
  });
  await newResident.save();

  await res.status(200).json({
    success: true,
    message: "New resident added succesfully",
    newResident,
  });
};
