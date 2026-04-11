import mongoose from 'mongoose';

const complaintSchema = mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    attachment_url: {
      type: String,
    },
    status: {
      type: String,
      enum: ['PENDING', 'IN_PROGRESS', 'RESOLVED', 'REJECTED'],
      default: 'PENDING',
    },
    admin_notes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export const complaintModel = mongoose.model('Complaints', complaintSchema);
