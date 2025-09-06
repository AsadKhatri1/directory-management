import mongoose from "mongoose";
import { expenseModel } from "../models/expenseModel.js";

// Expense adding
export const expenseController = async (req, res) => {
  try {
    const { Title, Amount, Type, fileUrl, date , account } = req.body;
    if (!Title || !Amount || !account) {
      return res
        .status(500)
        .json({ success: false, message: "Add amount or title" });
    }

            
    const expense = new expenseModel({
      Title,
      Amount,
      Type,
      account,
      fileUrl,
      date,
    });
    await expense.save();
    return res.status(200).send({
      success: true,
      message: "Expense added successfully",
      expense,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Error in adding expense" });
  }
};

// Getting all expenses
export const allExpenses = async (req, res) => {
  try {
    const expenseList = await expenseModel.find({}).sort({ createdAt: -1 });
    if (expenseList) {
      return res
        .status(200)
        .json({ success: true, message: "All expenses", expenseList });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Error in retrieving expenses" });
  }
};

// Getting single expense
export const expense = async (req, res) => {
  try {
    const id = req.params.id;
    const expense = await expenseModel.findById(id);
    if (expense) {
      return res
        .status(200)
        .json({ success: true, message: "Expense", expense });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Error in retrieving expense" });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Expense ID is required" });
    }

    if (!mongoose.isValidObjectId(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Expense ID" });
    }

    // Find the expense and verify ownership
    const expense = await expenseModel.findOne({ _id: id });
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found or you do not have permission to delete it",
      });
    }

    // Delete the expense
    const result = await expenseModel.deleteOne({ _id: id });

    // Check if deletion was successful
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Expense deleted successfully" });
  } catch (err) {
    console.error("Error deleting expense:", err);
    return res
      .status(500)
      .json({ success: false, message: "Error deleting expense" });
  }
};
