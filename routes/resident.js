import express from "express";
import formidable from "express-formidable";
import {
  allResidents,
  deleteResident,
  resident,
  residentController,
  updateResident,
  slipCreate,
  imageUpload,
} from "../controllers/residentController.js";

const router = express.Router();

router.post("/add", formidable(), residentController);

router.get("/getResidents", allResidents);
router.get("/getResident/:id", resident);
router.delete("/deleteResident/:id", deleteResident);
router.put("/updateResident/:id", updateResident);
router.post("/generateSlip/:residentId", slipCreate);
// router.get("/search", searchResident);

export default router;
