import express from 'express';
import { auth } from '../middlewears/auth.js';
import {
    getComplaintById,
    getComplaints,
    submitComplaint,
    updateComplaintNotes,
    updateComplaintStatus,
} from '../controllers/complaintController.js';

const router = express.Router();

// Public routes
router.post('/submit', submitComplaint);

// Admin routes (protected)
router.get('/admin/list', auth, getComplaints);
router.get('/admin/:id', auth, getComplaintById);
router.patch('/admin/:id/status', auth, updateComplaintStatus);
router.patch('/admin/:id/notes', auth, updateComplaintNotes);

export default router;
