import express from "express";
import { getBalance, updateBalance } from "../controllers/accController.js";

const router = express.Router();

router.put("/updateBalance/:id", updateBalance);
router.get("/getBalance/:id", getBalance);

export default router;
