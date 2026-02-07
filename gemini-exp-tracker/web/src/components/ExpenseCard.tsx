import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Expense } from '../types/expense';
import { format } from 'date-fns';

interface ExpenseCardProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense, onEdit, onDelete }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{expense.title}</Text>
        <Text style={styles.amount}>${expense.amount.toFixed(2)}</Text>
      </View>
      {expense.description && (
        <Text style={styles.description}>{expense.description}</Text>
      )}
      <View style={styles.details}>
        <Text style={styles.category}>{expense.category}</Text>
        <Text style={styles.date}>{format(new Date(expense.spentOnDate), 'PPP')}</Text>
      </View>
      <View style={styles.actions}>
        <Pressable onPress={() => onEdit(expense)} style={styles.editButton}>
          <Text style={styles.buttonText}>Edit</Text>
        </Pressable>
        <Pressable onPress={() => onDelete(expense.id)} style={styles.deleteButton}>
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745', // Green for positive amount
  },
  description: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  category: {
    fontSize: 12,
    backgroundColor: '#007bff', // Blue for category
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  date: {
    fontSize: 12,
    color: '#6c757d',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8, // Using gap for spacing
  },
  editButton: {
    backgroundColor: '#ffc107', // Yellow for edit
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: '#dc3545', // Red for delete
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default ExpenseCard;