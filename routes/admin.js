import express from "express";
import {
  adminController,
  adminLogin,
  getAdmin,
} from "../controllers/adminController.js";
const router = express.Router();

router.post("/add", adminController);
router.post("/login", adminLogin);
router.get("/getAdmin", getAdmin);

export default router;
