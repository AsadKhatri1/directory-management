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
