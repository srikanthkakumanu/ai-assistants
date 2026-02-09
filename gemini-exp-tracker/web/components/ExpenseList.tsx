'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getExpenses, deleteExpense, Expense, GetExpensesParams } from '@/lib/api';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ExpenseForm from './ExpenseForm';

interface ExpenseListProps {
  refreshKey: number; // Prop to trigger refetch
}

const ExpenseList: React.FC<ExpenseListProps> = ({ refreshKey }) => {
  const queryClient = useQueryClient();
  const [filterCategory, setFilterCategory] = useState<GetExpensesParams['category'] | undefined>(undefined);
  const [sortBy, setSortBy] = useState<GetExpensesParams['sortBy']>('spentOnDate');
  const [sortOrder, setSortOrder] = useState<GetExpensesParams['sortOrder']>('desc');
  const [editingExpense, setEditingExpense] = useState<Expense | undefined>(undefined);

  const { data: expenses, isLoading, isError, error } = useQuery<Expense[], Error>({
    queryKey: ['expenses', filterCategory, sortBy, sortOrder, refreshKey], // Include refreshKey in queryKey
    queryFn: () => getExpenses({ category: filterCategory, sortBy, sortOrder }),
  });

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
  });

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const handleExpenseFormSuccess = () => {
    setEditingExpense(undefined); // Close form
    queryClient.invalidateQueries({ queryKey: ['expenses'] }); // Refetch expenses
  };

  if (isLoading) return <div className="text-center py-4">Loading expenses...</div>;
  if (isError) return <div className="text-center py-4 text-red-600">Error: {error?.message}</div>;

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        {/* Category Filter */}
        <label htmlFor="filterCategory" className="text-sm font-medium text-gray-700">
          Filter by Category:
        </label>
        <select
          id="filterCategory"
          value={filterCategory || ''}
          onChange={(e) => setFilterCategory(e.target.value as GetExpensesParams['category'] || undefined)}
          className="p-2 border rounded-md shadow-sm text-sm"
        >
          <option value="">All</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Utilities">Utilities</option>
          <option value="Others">Others</option>
        </select>

        {/* Sort By */}
        <label htmlFor="sortBy" className="text-sm font-medium text-gray-700">
          Sort By:
        </label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as GetExpensesParams['sortBy'])}
          className="p-2 border rounded-md shadow-sm text-sm"
        >
          <option value="spentOnDate">Date</option>
          <option value="amount">Amount</option>
          <option value="createdAt">Created Date</option>
        </select>

        {/* Sort Order */}
        <label htmlFor="sortOrder" className="text-sm font-medium text-gray-700">
          Order:
        </label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as GetExpensesParams['sortOrder'])}
          className="p-2 border rounded-md shadow-sm text-sm"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      {expenses && expenses.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {expenses.map((expense) => (
            <li key={expense.id} className="py-4 flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">{expense.title}</p>
                <p className="text-sm text-gray-600">{expense.description}</p>
                <p className="text-sm text-gray-500">
                  {format(new Date(expense.spentOnDate), 'MMM d, yyyy')} - {expense.category}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-lg font-bold text-red-600">
                  ${expense.amount.toFixed(2)}
                </span>
                <Dialog open={!!editingExpense && editingExpense.id === expense.id} onOpenChange={() => setEditingExpense(undefined)}>
                  <DialogTrigger asChild>
                    <button
                      onClick={() => handleEdit(expense)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  </DialogTrigger>
                  <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white p-6 rounded-lg shadow-xl border">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-semibold mb-4">Edit Expense</DialogTitle>
                      <DialogDescription>
                        Make changes to your expense here. Click save when you&apos;re done.
                      </DialogDescription>
                    </DialogHeader>
                    {editingExpense && editingExpense.id === expense.id && (
                      <ExpenseForm initialData={editingExpense} onSuccess={handleExpenseFormSuccess} />
                    )}
                  </DialogContent>
                </Dialog>

                <button
                  onClick={() => deleteMutation.mutate(expense.id)}
                  disabled={deleteMutation.isPending}
                  className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 disabled:opacity-50"
                >
                  {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center py-4 text-gray-500">No expenses found. Add a new one above!</p>
      )}
    </div>
  );
};

export default ExpenseList;
