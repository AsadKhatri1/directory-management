import express from "express";
import { residentController } from "../controllers/residentController.js";
const router = express.Router();

router.post("/add", residentController);

export default router;
