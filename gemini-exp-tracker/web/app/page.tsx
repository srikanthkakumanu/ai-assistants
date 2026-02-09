'use client';

import React, { useState } from 'react';
import ExpenseForm from '@/components/ExpenseForm'; // Import ExpenseForm
import ExpenseList from '@/components/ExpenseList'; // Import ExpenseList

export default function Home() {
  const [refreshExpenses, setRefreshExpenses] = useState(0); // State to trigger expense list refresh

  const handleExpenseSuccess = () => {
    setRefreshExpenses(prev => prev + 1); // Increment to trigger refresh
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Expense Tracker</h1>
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
        {/* Expense Form */}
        <div className="mb-8 p-4 border rounded-md">
          <h2 className="text-2xl font-semibold mb-4">Add New Expense</h2>
          <ExpenseForm onSuccess={handleExpenseSuccess} />
        </div>

        {/* Expense List */}
        <div className="p-4 border rounded-md">
          <h2 className="text-2xl font-semibold mb-4">Expense List</h2>
          <ExpenseList refreshKey={refreshExpenses} />
        </div>
      </div>
    </div>
  );
}