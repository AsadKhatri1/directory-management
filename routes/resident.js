import express from "express";
import { auth } from "../middlewears/auth.js";
import {
  allResidents,
  deleteResident,
  resident,
  residentController,
  updateResident,
  slipCreate,
} from "../controllers/residentController.js";

const router = express.Router();

router.post("/add", auth, residentController);

router.get("/getResidents", allResidents);
router.get("/getResident/:id", resident);
router.delete("/deleteResident/:id", auth, deleteResident);
router.put("/updateResident/:id", auth, updateResident);
router.post("/generateSlip/:residentId", auth, slipCreate);
// router.get("/search", searchResident);

export default router;
