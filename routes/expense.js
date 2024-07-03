import express from "express";
import {
  allExpenses,
  expense,
  expenseController,
} from "../controllers/expenseController.js";
import { auth } from "../middlewears/auth.js";
const router = express.Router();

router.post("/addExpense", expenseController);
router.get("/expenses", allExpenses);
router.get("/getExpense/:id", expense);
export default router;
