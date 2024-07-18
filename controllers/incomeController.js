import { incomeModel } from "../models/incomeModel.js";

// creating income
export const createIncome = async (req, res) => {
  try {
    const { ResidentName, HouseNo, Amount, Reason } = req.body;

    const newIncome = await new incomeModel({
      ResidentName,
      HouseNo,
      Amount,
      Reason,
    });
    await newIncome.save();
    return res.status(200).json({
      success: true,
      message: "Income created succesfully",
      newIncome,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: true,
      message: "Income isntcreated ",
    });
  }
};

// getting all incomes

export const allIncomes = async (req, res) => {
  try {
    const incomeList = await incomeModel.find({}).sort({ createdAt: -1 });
    if (incomeList) {
      return res
        .status(200)
        .json({ success: true, message: "All incomes", incomeList });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Error in retreiving incomes" });
  }
};
