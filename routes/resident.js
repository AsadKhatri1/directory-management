import express from "express";
import {
  allResidents,
  deleteResident,
  resident,
  residentController,
  updateResident,
} from "../controllers/residentController.js";
const router = express.Router();

router.post("/add", residentController);
router.get("/getResidents", allResidents);
router.get("/getResident/:id", resident);
router.delete("/deleteResident/:id", deleteResident);
router.put("/updateResident/:id", updateResident);

export default router;
