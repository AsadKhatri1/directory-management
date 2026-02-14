import { complaintModel } from '../models/complaintModel.js';

// ✅ Submit a new complaint (Public)
export const submitComplaint = async (req, res) => {
    try {
        const complaint = await complaintModel.create(req.body);
        res.status(201).json({
            success: true,
            data: complaint,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// ✅ Get all complaints (Admin)
export const getComplaints = async (req, res) => {
    try {
        const { status, category, search } = req.query;

        const filter = {};
        if (status) filter.status = status;
        if (category) filter.category = category;
        if (search) {
            filter.$or = [
                { full_name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { title: { $regex: search, $options: 'i' } },
            ];
        }

        const complaints = await complaintModel
            .find(filter)
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: complaints.length,
            data: complaints,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get single complaint by ID (Admin)
export const getComplaintById = async (req, res) => {
    try {
        const complaint = await complaintModel.findById(req.params.id);
        if (!complaint) {
            return res
                .status(404)
                .json({ success: false, message: 'Complaint not found' });
        }
        res.status(200).json({ success: true, data: complaint });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Update complaint status (Admin)
export const updateComplaintStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const complaint = await complaintModel.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );
        if (!complaint) {
            return res
                .status(404)
                .json({ success: false, message: 'Complaint not found' });
        }
        res.status(200).json({ success: true, data: complaint });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// ✅ Update admin notes (Admin)
export const updateComplaintNotes = async (req, res) => {
    try {
        const { admin_notes } = req.body;
        const complaint = await complaintModel.findByIdAndUpdate(
            req.params.id,
            { admin_notes },
            { new: true }
        );
        if (!complaint) {
            return res
                .status(404)
                .json({ success: false, message: 'Complaint not found' });
        }
        res.status(200).json({ success: true, data: complaint });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
