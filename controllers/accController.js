import { accModel } from "../models/accModel.js";

// updating balancve

export const updateBalance = async (req, res) => {
  try {
    const id = req.params.id;
    const { Balance } = req.body;
    const update = await accModel.findByIdAndUpdate(
      id,
      { Balance },
      { new: true }
    );
    if (update) {
      return res.status(200).json({
        balance: Balance,
        success: true,
        message: "Balance updated",
        update,
      });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: "error" });
  }
};

// getting balancve

export const getBalance = async (req, res) => {
  try {
    const id = req.params.id;

    const acc = await accModel.findById({ _id: id });
    if (acc) {
      return res
        .status(200)
        .json({ success: true, message: "Balance getted", acc });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: "error" });
  }
};
