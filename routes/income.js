import express from "express";
import { allIncomes, createIncome } from "../controllers/incomeController.js";

const router = express.Router();

router.post("/addIncome", createIncome);
router.get("/allIncomes", allIncomes);

export default router;
