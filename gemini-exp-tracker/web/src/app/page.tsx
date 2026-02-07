"use client";

import React, { useState } from "react";
import { View, Text, Pressable } from 'react-native';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getExpenses, createExpense, updateExpense, deleteExpense, getCategorySpendingSummary } from "../lib/api";
import ExpenseCard from "../components/ExpenseCard";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseFilterSort from "../components/ExpenseFilterSort";
import CategorySpendingSummaryComponent from "../components/CategorySpendingSummary";
import { Expense, CreateExpenseInput, UpdateExpenseInput, ExpenseCategory } from "../types/expense";

export default function HomePage() {
  const queryClient = useQueryClient();
  const [editingExpense, setEditingExpense] = useState<Expense | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState<ExpenseCategory | undefined>(undefined);
  const [sortByField, setSortByField] = useState<'amount' | 'spentOnDate' | undefined>(undefined);
  const [sortByOrder, setSortByOrder] = useState<'ASC' | 'DESC' | undefined>(undefined);

  const {
    data: expenses,
    isLoading: isLoadingExpenses,
    isError: isErrorExpenses,
    error: expensesError,
  } = useQuery<Expense[]>({
    queryKey: ["expenses", filterCategory, sortByField, sortByOrder],
    queryFn: () => getExpenses({ category: filterCategory }, sortByField && sortByOrder ? { field: sortByField, order: sortByOrder } : undefined),
  });

  const {
    data: categorySummary,
    isLoading: isLoadingSummary,
    isError: isErrorSummary,
    error: summaryError,
  } = useQuery<any[]>({
    queryKey: ["categorySummary"],
    queryFn: getCategorySpendingSummary,
  });

  const createExpenseMutation = useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["categorySummary"] });
      handleFormSuccess();
    },
    onError: (error) => {
      console.error("Error creating expense:", error);
      alert("Failed to create expense.");
    },
  });

  const updateExpenseMutation = useMutation({
    mutationFn: (data: { id: string; expense: UpdateExpenseInput }) => updateExpense(data.id, data.expense),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["categorySummary"] });
      handleFormSuccess();
    },
    onError: (error) => {
      console.error("Error updating expense:", error);
      alert("Failed to update expense.");
    },
  });

  const deleteExpenseMutation = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["categorySummary"] });
    },
    onError: (error) => {
      console.error("Error deleting expense:", error);
      alert("Failed to delete expense.");
    },
  });

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this expense?")) {
      deleteExpenseMutation.mutate(id);
    }
  };

  const handleFormSubmit = (data: CreateExpenseInput | UpdateExpenseInput) => {
    if (editingExpense) {
      updateExpenseMutation.mutate({ id: editingExpense.id, expense: data });
    } else {
      createExpenseMutation.mutate(data as CreateExpenseInput);
    }
  };

  const handleFormSuccess = () => {
    setEditingExpense(undefined);
    setShowForm(false);
  };

  if (isLoadingExpenses) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text>Loading expenses...</Text>
      </View>
    );
  }

  if (isErrorExpenses) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text>Error loading expenses: {expensesError?.message}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4 bg-gray-100 overflow-auto">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-3xl font-bold">Expense Tracker</Text>
        <Pressable
          className="bg-green-500 p-3 rounded-lg text-white text-lg font-bold"
          onPress={() => {
            setEditingExpense(undefined);
            setShowForm(!showForm);
          }}
        >
          <Text className="text-white text-lg font-bold">{showForm ? "Hide Form" : "Add Expense"}</Text>
        </Pressable>
      </View>

      <View className="mb-4">
        <ExpenseFilterSort
          onCategoryChange={setFilterCategory}
          onSortChange={(field, order) => {
            setSortByField(field);
            setSortByOrder(order);
          }}
          currentCategory={filterCategory}
          currentSortField={sortByField}
          currentSortOrder={sortByOrder}
        />
      </View>

      {showForm && (
        <View className="mb-8">
          <ExpenseForm
            initialValues={editingExpense}
            onSubmit={handleFormSubmit}
            isSubmitting={createExpenseMutation.isPending || updateExpenseMutation.isPending}
          />
        </View>
      )}

      {isLoadingSummary ? (
        <View className="flex-1 items-center justify-center p-4">
          <Text>Loading summary...</Text>
        </View>
      ) : isErrorSummary ? (
        <View className="flex-1 items-center justify-center p-4">
          <Text>Error loading summary: {summaryError?.message}</Text>
        </View>
      ) : (
        <CategorySpendingSummaryComponent summary={categorySummary} />
      )}

      <View>
        {expenses?.map((expense: Expense) => (
          <ExpenseCard key={expense.id} expense={expense} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </View>
    </View>
  );
}