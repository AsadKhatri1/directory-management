import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { adminModel } from "../models/adminModel.js";
import jwt from "jsonwebtoken";

// admin adding
export const adminController = async (req, res) => {
  const { FullName, Email, Password, Phone } = req.body;

  if (!validator.isEmail(Email)) {
    return res.status(400).send({
      success: false,
      message: "Enter valid email",
    });
  }
  if (Password) {
    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(Password, salt);
  }

  const admin = await new adminModel({
    FullName,
    Email,
    Password: hashedPassword,
    Phone,
  });

  await admin.save();
  return res.status(200).send({
    success: true,
    message: "Admin added succesfully",
    admin,
  });
};

// Admin login

export const adminLogin = async (req, res) => {
  const { Email, Password } = req.body;
  if (!Email || !validator.isEmail(Email)) {
    return res.status(400).send({
      success: false,
      message: "Enter valid email address",
    });
  }
  const adminExist = await adminModel.findOne({ Email });
  if (!adminExist) {
    return res.status(400).send({
      success: false,
      message: "No admin found with this Email",
    });
  }

  const passCheck = await bcrypt.compare(Password, adminExist.Password);
  if (!passCheck) {
    return res.status(400).send({
      success: false,
      message: "Wrong password",
    });
  }
  if (passCheck) {
    var token = jwt.sign({ id: adminExist._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES,
    });
    return res.status(200).send({
      success: true,
      message: "Admin loggedin succesfully",
      token: token,
    });
  }
};

// getting admins

export const getAdmin = async (req, res) => {
  try {
    const admins = await adminModel.find();
    if (!admins) {
      return res.status(400).send({
        success: false,
        message: "No admin found",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "All admin list",
        admins,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
