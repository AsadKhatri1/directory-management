import { violationModel } from '../models/violationModel.js';

// ✅ Create a new violation
export const createViolation = async (req, res) => {
  try {
    const violation = await violationModel.create(req.body);
    res.status(201).json({
      success: true,
      data: violation,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ Get all violations (with optional status filter)
export const getViolations = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = {};
    if (status) {
      filter.Status = status;
    }

    const violations = await violationModel
      .find(filter)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: violations.length,
      data: violations,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get single violation by ID
export const getViolationById = async (req, res) => {
  try {
    const violation = await violationModel.findById(req.params.id);
    if (!violation) {
      return res
        .status(404)
        .json({ success: false, message: 'Violation not found' });
    }
    res.status(200).json({ success: true, data: violation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update violation by ID
export const updateViolation = async (req, res) => {
  try {
    const violation = await violationModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!violation) {
      return res
        .status(404)
        .json({ success: false, message: 'Violation not found' });
    }
    res.status(200).json({ success: true, data: violation });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ Delete violation by ID
export const deleteViolation = async (req, res) => {
  try {
    const violation = await violationModel.findByIdAndDelete(req.params.id);
    if (!violation) {
      return res
        .status(404)
        .json({ success: false, message: 'Violation not found' });
    }
    res
      .status(200)
      .json({ success: true, message: 'Violation deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
