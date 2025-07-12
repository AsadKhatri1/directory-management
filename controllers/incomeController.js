import { incomeModel } from "../models/incomeModel.js";

// creating income
export const createIncome = async (req, res) => {
  try {
    const {
      ResidentName,
      HouseNo,
      Amount,
      account,
      Ownership,
      Type,
      Reason,
      date,
      fileUrl,
    } = req.body;

    const newIncome = await new incomeModel({
      ResidentName,
      HouseNo,
      Amount,
      Reason,
      Ownership,
      Type,
      account,
      date,
      fileUrl,
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


export const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Income ID is required" });
    }

    if (!mongoose.isValidObjectId(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Income ID" });
    }

    // Find the expense and verify ownership
    const expense = await incomeModel.findById(id);
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Income not found or you do not have permission to delete it",
      });
    }

    // Delete the expense
    // const result = await incomeModel.deleteOne({ _id: id });

    // // Check if deletion was successful
    // if (result.deletedCount === 0) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "Income not found" });
    // }

    return res
      .status(200)
      .json({ success: true, message: "Income deleted successfully", expense });
  } catch (err) {
    console.error("Error deleting expense:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed To Delete Expense " });
  }
};
