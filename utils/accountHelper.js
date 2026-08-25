import { accModel } from "../models/accModel.js";
import { incomeModel } from "../models/incomeModel.js";

export const REC_ACC_ID = "667fcfaf4a76b7ceb03176d9";
export const MASJID_ACC_ID = "667fcfe14a76b7ceb03176da";
export const MEMBERSHIP_FEE = 10000;

export const creditAccountById = async (id, amount) => {
  const acc = await accModel.findById(id);
  if (!acc) {
    throw new Error("Account not found");
  }
  const newBalance = parseFloat(acc.Balance || 0) + Number(amount);
  acc.Balance = String(newBalance);
  await acc.save();
  return acc;
};

/** Split amount 50/50 into REC + Masjid incomes and credit both balances */
export const createSplitIncomeAndCredit = async ({
  resident,
  amount,
  type,
  reason,
  ownership,
}) => {
  const half = Number(amount) / 2;
  const common = {
    ResidentName: resident.FullName || "Unknown",
    HouseNo: resident.HouseNumber || "",
    Ownership: ownership || resident.residentType || "",
    Type: type,
    Reason: reason || type,
    date: new Date(),
  };

  const incomes = await incomeModel.insertMany([
    { ...common, Amount: String(half), account: "rec" },
    { ...common, Amount: String(half), account: "masjid" },
  ]);

  await creditAccountById(REC_ACC_ID, half);
  await creditAccountById(MASJID_ACC_ID, half);

  return incomes;
};

export const makeReceiptId = (prefix = "REC") => {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${dateStr}-${randomPart}`;
};
