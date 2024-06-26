import express from "express";
import { expenseController } from "../controllers/expenseController.js";
import { auth } from "../middlewears/auth.js";
const router = express.Router();

router.post("/addExpense", expenseController);
export default router;
