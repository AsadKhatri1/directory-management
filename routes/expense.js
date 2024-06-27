import express from "express";
import {
  allExpenses,
  expenseController,
} from "../controllers/expenseController.js";
import { auth } from "../middlewears/auth.js";
const router = express.Router();

router.post("/addExpense", expenseController);
router.get("/expenses", allExpenses);
export default router;
