import mongoose from 'mongoose';

const expenseSchema = mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },

    Amount: {
      type: String,
      required: true,
    },
    Type: {
      type: String,
    },
    date: {
      type: Date,
    },
    account :{
            type: String,
            enum: ['rec' ,'masjid'],  // Example accounts only send 'rec' or 'masjid'
            required: true
    },
    fileUrl: {
      type: String,
    },
    date: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const expenseModel = mongoose.model('Expenses', expenseSchema);
