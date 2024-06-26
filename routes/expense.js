import express from "express";
import { expenseController } from "../controllers/expenseController";
const router = express.Router();

router.post("/addExpense", auth, expenseController);
export default router;
