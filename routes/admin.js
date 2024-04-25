import express from "express";
import { adminController, adminLogin } from "../controllers/adminController.js";
const router = express.Router();

router.post("/add", adminController);
router.get("/login", adminLogin);

export default router;
