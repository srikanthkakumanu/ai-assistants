const { Expense, ExpenseCategory } = require('../models/expense.model');
const { isValidObjectId } = require('mongoose');
const { Request, Response } = require('express'); // Import Request and Response types as values for CommonJS

// Create a new expense
const createExpense = async (req: typeof Request, res: typeof Response) => {
  try {
    const { title, description, amount, category, spentOnDate } = req.body;

    // Basic validation
    if (!title || !amount || !category || !spentOnDate) {
      return res.status(400).json({ message: 'Missing required fields: title, amount, category, spentOnDate' });
    }

    if (!Object.values(ExpenseCategory).includes(category)) {
      return res.status(400).json({ message: `Invalid category. Must be one of: ${Object.values(ExpenseCategory).join(', ')}` });
    }

    const newExpense = new Expense({
      title,
      description,
      amount,
      category,
      spentOnDate: new Date(spentOnDate),
    });

    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all expenses with optional filtering and sorting
const getExpenses = async (req: typeof Request, res: typeof Response) => {
  try {
    const { category, sortBy, sortOrder } = req.query;
    const filter: { category?: string } = {}; // Use string for category type
    const sort: { [key: string]: 1 | -1 } = {};

    if (category && Object.values(ExpenseCategory).includes(category)) {
      filter.category = category;
    }

    if (sortBy) {
      const order = sortOrder === 'desc' ? -1 : 1;
      sort[sortBy as string] = order;
    }

    const expenses = await Expense.find(filter).sort(sort);
    res.status(200).json(expenses);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a single expense by ID
const getExpenseById = async (req: typeof Request, res: typeof Response) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findOne({ id: id }); // Query by custom 'id' field

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(200).json(expense);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update an expense by ID
const updateExpense = async (req: typeof Request, res: typeof Response) => {
  try {
    const { id } = req.params;
    const { title, description, amount, category, spentOnDate } = req.body;

    const updateFields: {
        title?: string;
        description?: string;
        amount?: number;
        category?: string; // Use string for category type
        spentOnDate?: Date;
      } = {};
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (amount) updateFields.amount = amount;
    if (category) {
      if (!Object.values(ExpenseCategory).includes(category)) {
        return res.status(400).json({ message: `Invalid category. Must be one of: ${Object.values(ExpenseCategory).join(', ')}` });
      }
      updateFields.category = category;
    }
    if (spentOnDate) updateFields.spentOnDate = new Date(spentOnDate);

    const updatedExpense = await Expense.findOneAndUpdate({ id: id }, updateFields, { new: true, runValidators: true });

    if (!updatedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(200).json(updatedExpense);
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete an expense by ID
const deleteExpense = async (req: typeof Request, res: typeof Response) => {
  try {
    const { id } = req.params;

    const deletedExpense = await Expense.findOneAndDelete({ id: id });

    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(204).send(); // No content for successful deletion
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
};
