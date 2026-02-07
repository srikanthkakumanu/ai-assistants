import { Expense, ExpenseCategory } from "../models/expense.model";

export const createExpense = async (req: Request, res: Response) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Error creating expense", error });
  }
};

export const getAllExpenses = async (req: Request, res: Response) => {
  try {
    const { category, sortBy, order } = req.query;

    let where: any = {};
    let orderClause: any = [];

    if (category) {
      const categoryString = Array.isArray(category) ? category[0] : (category as string);
      if (!(Object.values(ExpenseCategory) as string[]).includes(categoryString)) {
        return res.status(400).json({ message: `Invalid category: ${categoryString}. Must be one of ${Object.values(ExpenseCategory).join(', ')}` });
      }
      where.category = categoryString;
    }

    if (sortBy && order) {
      const sortByString = Array.isArray(sortBy) ? sortBy[0] : (sortBy as string);
      const orderString = Array.isArray(order) ? order[0] : (order as string);

      if (!['amount', 'spentOnDate'].includes(sortByString)) {
        return res.status(400).json({ message: `Invalid sortBy parameter: ${sortByString}. Must be 'amount' or 'spentOnDate'.` });
      }
      if (!['asc', 'desc'].includes(orderString.toLowerCase())) {
        return res.status(400).json({ message: `Invalid order parameter: ${orderString}. Must be 'asc' or 'desc'.` });
      }
      orderClause.push([sortByString, orderString.toUpperCase()]);
    } else {
      orderClause.push(['createdAt', 'DESC']); // Default sort
    }

    const expenses = await Expense.findAll({
      where,
      order: orderClause,
    });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses", error });
  }
};

export const getCategorySpendingSummary = async (req: Request, res: Response) => {
  try {
    const summary = await Expense.findAll({
      attributes: [
        'category',
        [Expense.sequelize?.fn('SUM', Expense.sequelize.col('amount')), 'totalSpent']
      ],
      group: ['category'],
    });
    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category spending summary", error });
  }
};

export const getExpenseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findByPk(id);
    if (expense) {
      res.status(200).json(expense);
    } else {
      res.status(404).json({ message: "Expense not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching expense", error });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [updated] = await Expense.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedExpense = await Expense.findByPk(id);
      res.status(200).json(updatedExpense);
    } else {
      res.status(404).json({ message: "Expense not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating expense", error });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Expense.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Expense not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting expense", error });
  }
};