import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CategorySpendingSummary } from '../types/expense';

interface CategorySpendingSummaryProps {
  summary: CategorySpendingSummary[];
}

const CategorySpendingSummaryComponent: React.FC<CategorySpendingSummaryProps> = ({ summary }) => {
  if (!summary || summary.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No spending data available for categories.</Text>
      </View>
    );
  }

  const totalOverallSpent = summary.reduce((sum, item) => sum + Number(item.totalSpent), 0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Category Spending Summary</Text>
      {summary.map((item, index) => (
        <View key={index} style={styles.summaryItem}>
          <Text style={styles.categoryName}>{item.category}</Text>
          <Text style={styles.totalSpent}>${Number(item.totalSpent).toFixed(2)}</Text>
        </View>
      ))}
      <View style={styles.totalOverall}>
        <Text style={styles.totalOverallText}>Total Overall Spent:</Text>
        <Text style={styles.totalOverallAmount}>${totalOverallSpent.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e9ecef',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#343a40',
    textAlign: 'center',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  categoryName: {
    fontSize: 16,
    color: '#495057',
  },
  totalSpent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
  },
  totalOverall: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginTop: 8,
    borderTopWidth: 2,
    borderTopColor: '#adb5bd',
  },
  totalOverallText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
  },
  totalOverallAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
  },
  noDataText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
});

export default CategorySpendingSummaryComponent;