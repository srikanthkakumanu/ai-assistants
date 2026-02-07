export enum ExpenseCategory {
  Food = 'Food',
  Travel = 'Travel',
  Utilities = 'Utilities',
  Others = 'Others',
}

export interface Expense {
  id: string;
  title: string;
  description?: string;
  amount: number;
  category: ExpenseCategory;
  spentOnDate: string; // Using string for date for simplicity in frontend, can be converted to Date object if needed
  createdAt: string;
  updatedAt: string;
}

export interface CreateExpenseInput {
  title: string;
  description?: string;
  amount: number;
  category: ExpenseCategory;
  spentOnDate: string;
}

export interface UpdateExpenseInput {
  title?: string;
  description?: string;
  amount?: number;
  category?: ExpenseCategory;
  spentOnDate?: string;
}

export interface CategorySpendingSummary {
  category: ExpenseCategory;
  totalSpent: number;
}
