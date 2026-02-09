import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:30001'; // Default to NodePort for API Service

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Expense {
  id: string;
  title: string;
  description?: string;
  amount: number;
  category: 'Food' | 'Travel' | 'Utilities' | 'Others';
  spentOnDate: string; // ISO date string
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateExpenseData {
  title: string;
  description?: string;
  amount: number;
  category: 'Food' | 'Travel' | 'Utilities' | 'Others';
  spentOnDate: string;
}

export interface UpdateExpenseData {
  title?: string;
  description?: string;
  amount?: number;
  category?: 'Food' | 'Travel' | 'Utilities' | 'Others';
  spentOnDate?: string;
}

export interface GetExpensesParams {
  category?: 'Food' | 'Travel' | 'Utilities' | 'Others';
  sortBy?: 'amount' | 'spentOnDate' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}

export const getExpenses = async (params?: GetExpensesParams): Promise<Expense[]> => {
  const response = await api.get<Expense[]>('/expenses', { params });
  return response.data;
};

export const getExpenseById = async (id: string): Promise<Expense> => {
  const response = await api.get<Expense>(`/expenses/${id}`);
  return response.data;
};

export const createExpense = async (data: CreateExpenseData): Promise<Expense> => {
  const response = await api.post<Expense>('/expenses', data);
  return response.data;
};

export const updateExpense = async (id: string, data: UpdateExpenseData): Promise<Expense> => {
  const response = await api.put<Expense>(`/expenses/${id}`, data);
  return response.data;
};

export const deleteExpense = async (id: string): Promise<void> => {
  await api.delete(`/expenses/${id}`);
};
