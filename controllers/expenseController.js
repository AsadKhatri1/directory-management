import mongoose from "mongoose";

import { expenseModel } from "../models/expenseModel.js";

// expense adding

export const expenseController = async (req, res) => {
  try {
    const { Title, Amount } = req.body;
    if (!Title || !Amount) {
      return res
        .status(500)
        .json({ sucess: false, message: "Add amount or title" });
    }

    const expense = await new expenseModel({
      Title,
      Amount,
    });
    await expense.save();
    return res.status(200).send({
      success: true,
      message: "Expense added succesfully",
      expense,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ sucess: false, message: "Error in adding expense" });
  }
};

// getting all expenses
export const allExpenses = async (req, res) => {
  try {
    const expenseList = await expenseModel.find({});
    if (expenseList) {
      return res
        .status(200)
        .json({ success: true, message: "All expenses", expenseList });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Error in retreiving expenses" });
  }
};
// getting single expense
export const expense = async (req, res) => {
  try {
    const id = req.params.id;
    const expense = await expenseModel.findById(id);
    if (expense) {
      return res
        .status(200)
        .json({ success: true, message: "expenses", expense });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Error in retreiving expense" });
  }
};
