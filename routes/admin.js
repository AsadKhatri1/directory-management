import express from "express";
import { adminController, adminLogin } from "../controllers/adminController.js";
const router = express.Router();

router.post("/add", adminController);
router.post("/login", adminLogin);

export default router;
