import express from "express";
import {
  allIncomes,
  createIncome,
  deleteIncome,
} from "../controllers/incomeController.js";

const router = express.Router();

router.post("/addIncome", createIncome);
router.get("/allIncomes", allIncomes);
router.delete("/deleteIncome/:id", deleteIncome);

export default router;
