const { Schema, model, Document } = require('mongoose');
const { randomUUID } = require('node:crypto');

const ExpenseCategory = {
  Food: 'Food',
  Travel: 'Travel',
  Utilities: 'Utilities',
  Others: 'Others',
};

const ExpenseSchema = new Schema(
  {
    id: { type: String, unique: true, required: true, default: () => randomUUID() },
    title: { type: String, required: true },
    description: { type: String, required: false },
    amount: { type: Number, required: true },
    category: { type: String, enum: Object.values(ExpenseCategory), required: true },
    spentOnDate: { type: Date, required: true },
  },
  {
    timestamps: true, // This handles createdAt and updatedAt
  }
);

const Expense = model('Expense', ExpenseSchema);

module.exports = { Expense, ExpenseCategory };
