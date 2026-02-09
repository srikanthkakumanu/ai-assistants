'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CreateExpenseData, Expense, UpdateExpenseData, createExpense, updateExpense } from '@/lib/api'; // Assuming @/lib/api maps to web/lib/api.ts

const expenseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  amount: z.string().min(1, 'Amount is required').regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount format'), // Validate as string with regex
  category: z.enum(['Food', 'Travel', 'Utilities', 'Others']),
  spentOnDate: z.string().refine((val) => !isNaN(new Date(val).getTime()), 'Invalid date format'),
});

// Infer the type after Zod validation but before API call conversion
type ExpenseFormInputs = z.infer<typeof expenseSchema>;

interface ExpenseFormProps {
  initialData?: Expense; // For editing existing expenses
  onSuccess?: () => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ initialData, onSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseFormInputs>({
    resolver: zodResolver(expenseSchema),
    defaultValues: initialData ? {
      title: initialData.title,
      description: initialData.description,
      amount: initialData.amount.toFixed(2), // Convert number back to string for input
      category: initialData.category,
      spentOnDate: initialData.spentOnDate.split('T')[0], // Format to YYYY-MM-DD for input type="date"
    } : {
      title: '',
      description: '',
      amount: '', // Default as empty string
      category: 'Food', // Default category
      spentOnDate: new Date().toISOString().split('T')[0], // Default to today
    },
  });

  const onSubmit = async (data: ExpenseFormInputs) => {
    try {
      // Convert amount string to number before sending to API
      const dataToSend = {
        ...data,
        amount: parseFloat(data.amount),
      };

      if (initialData) {
        await updateExpense(initialData.id, dataToSend as UpdateExpenseData);
      } else {
        await createExpense(dataToSend as CreateExpenseData);
      }
      reset(); // Clear form after submission
      onSuccess?.(); // Call success callback
    } catch (error) {
      console.error('Failed to save expense:', error);
      alert('Failed to save expense. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          {...register('title')}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          {...register('description')}
          rows={2}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        ></textarea>
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          type="text" // Changed to text to allow for proper regex validation
          id="amount"
          {...register('amount')}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          {...register('category')}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Utilities">Utilities</option>
          <option value="Others">Others</option>
        </select>
        {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
      </div>

      <div>
        <label htmlFor="spentOnDate" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          id="spentOnDate"
          {...register('spentOnDate')}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {errors.spentOnDate && <p className="text-red-500 text-xs mt-1">{errors.spentOnDate.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Saving...' : initialData ? 'Update Expense' : 'Add Expense'}
      </button>
    </form>
  );
};

export default ExpenseForm;
