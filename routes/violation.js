import express from 'express';
import {
  createViolation,
  deleteViolation,
  getViolationById,
  getViolations,
  updateViolation,
} from '../controllers/violationController.js';

const router = express.Router();

router.post('/save', createViolation); // Create
router.get('/list', getViolations); // Read all
router.get('/:id', getViolationById); // Read one
router.put('/:id', updateViolation); // Update
router.delete('/:id', deleteViolation);

export default router;
