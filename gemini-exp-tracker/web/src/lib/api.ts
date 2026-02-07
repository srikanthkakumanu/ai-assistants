import axios from "axios";
import { Expense, CreateExpenseInput, UpdateExpenseInput, ExpenseCategory, CategorySpendingSummary } from "../types/expense";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getExpenses = async (filters?: { category?: ExpenseCategory }, sortBy?: { field: "amount" | "spentOnDate"; order: "ASC" | "DESC" }): Promise<Expense[]> => {
  const params = new URLSearchParams();
  if (filters?.category) {
    params.append("category", filters.category);
  }
  if (sortBy?.field && sortBy?.order) {
    params.append("sortBy", sortBy.field);
    params.append("order", sortBy.order);
  }
  const response = await api.get(`/expenses?${params.toString()}`);
  return response.data;
};

export const getExpenseById = async (id: string): Promise<Expense> => {
  const response = await api.get(`/expenses/${id}`);
  return response.data;
};

export const createExpense = async (expense: CreateExpenseInput): Promise<Expense> => {
  const response = await api.post("/expenses", expense);
  return response.data;
};

export const updateExpense = async (id: string, expense: UpdateExpenseInput): Promise<Expense> => {
  const response = await api.put(`/expenses/${id}`, expense);
  return response.data;
};

export const deleteExpense = async (id: string): Promise<void> => {
  await api.delete(`/expenses/${id}`);
};

export const getCategorySpendingSummary = async (): Promise<CategorySpendingSummary[]> => {
  const response = await api.get("/expenses/summary");
  return response.data;
};

export default api;

