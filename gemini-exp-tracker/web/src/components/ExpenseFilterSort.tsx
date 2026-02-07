import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { ExpenseCategory } from '../types/expense';

interface ExpenseFilterSortProps {
  onCategoryChange: (category: ExpenseCategory | undefined) => void;
  onSortChange: (field: 'amount' | 'spentOnDate' | undefined, order: 'ASC' | 'DESC' | undefined) => void;
  currentCategory?: ExpenseCategory;
  currentSortField?: 'amount' | 'spentOnDate';
  currentSortOrder?: 'ASC' | 'DESC';
}

const sortFields = [
  { label: 'Amount', value: 'amount' },
  { label: 'Date', value: 'spentOnDate' },
];

const sortOrders = [
  { label: 'Ascending', value: 'ASC' },
  { label: 'Descending', value: 'DESC' },
];

const ExpenseFilterSort: React.FC<ExpenseFilterSortProps> = ({
  onCategoryChange,
  onSortChange,
  currentCategory,
  currentSortField,
  currentSortOrder,
}) => {
  const categories = [{ label: 'All Categories', value: undefined }].concat(
    Object.values(ExpenseCategory).map((category) => ({
      label: category,
      value: category,
    }))
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterGroup}>
        <Text style={styles.label}>Filter by Category:</Text>
        <RNPickerSelect
          onValueChange={(value) => onCategoryChange(value)}
          items={categories}
          value={currentCategory}
          style={pickerSelectStyles}
          placeholder={{ label: 'All Categories', value: undefined }}
        />
      </View>

      <View style={styles.sortGroup}>
        <Text style={styles.label}>Sort by:</Text>
        <RNPickerSelect
          onValueChange={(value) => onSortChange(value, currentSortOrder)}
          items={sortFields}
          value={currentSortField}
          style={pickerSelectStyles}
          placeholder={{ label: 'Sort Field', value: undefined }}
        />
        <RNPickerSelect
          onValueChange={(value) => onSortChange(currentSortField, value)}
          items={sortOrders}
          value={currentSortOrder}
          style={pickerSelectStyles}
          placeholder={{ label: 'Sort Order', value: undefined }}
        />
      </View>

      <Pressable
        onPress={() => {
          onCategoryChange(undefined);
          onSortChange(undefined, undefined);
        }}
        style={styles.resetButton}
      >
        <Text style={styles.resetButtonText}>Reset Filters & Sort</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    marginBottom: 12,
  },
  filterGroup: {
    marginBottom: 12,
  },
  sortGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#343a40',
  },
  resetButton: {
    backgroundColor: '#6c757d',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#ced4da',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  placeholder: {
    color: '#6c757d',
  },
});

export default ExpenseFilterSort;