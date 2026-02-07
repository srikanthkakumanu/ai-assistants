import React, { useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreateExpenseInput, ExpenseCategory, UpdateExpenseInput } from '../types/expense';
import RNPickerSelect from 'react-native-picker-select';

interface ExpenseFormProps {
  initialValues?: CreateExpenseInput;
  onSubmit: (data: CreateExpenseInput | UpdateExpenseInput) => void;
  isSubmitting: boolean;
}

const expenseFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  amount: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().positive('Amount must be a positive number')
  ),
  category: z.nativeEnum(ExpenseCategory, {
    errorMap: () => ({ message: 'Category is required' }),
  }),
  spentOnDate: z.string().datetime('Spent on date must be a valid date string'),
});

const ExpenseForm: React.FC<ExpenseFormProps> = ({ initialValues, onSubmit, isSubmitting }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateExpenseInput | UpdateExpenseInput>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: initialValues || {
      title: '',
      description: '',
      amount: 0,
      category: ExpenseCategory.Food,
      spentOnDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        ...initialValues,
        amount: initialValues.amount, // Ensure amount is number
        spentOnDate: initialValues.spentOnDate.split('T')[0], // Format date for input
      });
    }
  }, [initialValues, reset]);

  const categories = Object.values(ExpenseCategory).map((category) => ({
    label: category,
    value: category,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value as string}
            placeholder="e.g., Groceries"
          />
        )}
      />
      {errors.title && <Text style={styles.errorText}>{errors.title.message}</Text>}

      <Text style={styles.label}>Description (Optional)</Text>
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value as string}
            placeholder="e.g., Weekly shopping at market"
          />
        )}
      />

      <Text style={styles.label}>Amount</Text>
      <Controller
        control={control}
        name="amount"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(text) => onChange(text)}
            value={value ? String(value) : ''}
            placeholder="e.g., 50.00"
            keyboardType="numeric"
          />
        )}
      />
      {errors.amount && <Text style={styles.errorText}>{errors.amount.message}</Text>}

      <Text style={styles.label}>Category</Text>
      <Controller
        control={control}
        name="category"
        render={({ field: { onChange, value } }) => (
          <RNPickerSelect
            onValueChange={onChange}
            items={categories}
            value={value as string}
            style={pickerSelectStyles}
            placeholder={{ label: 'Select a category...', value: null }}
          />
        )}
      />
      {errors.category && <Text style={styles.errorText}>{errors.category.message}</Text>}

      <Text style={styles.label}>Spent On Date</Text>
      <Controller
        control={control}
        name="spentOnDate"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value as string}
            placeholder="YYYY-MM-DD"
          />
        )}
      />
      {errors.spentOnDate && <Text style={styles.errorText}>{errors.spentOnDate.message}</Text>}

      <Pressable
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        style={[styles.button, isSubmitting && styles.buttonDisabled]}
      >
        <Text style={styles.buttonText}>{isSubmitting ? 'Submitting...' : 'Save Expense'}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#343a40',
  },
  input: {
    height: 40,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
    color: '#495057',
  },
  errorText: {
    color: '#dc3545',
    marginBottom: 10,
    marginTop: -10,
    fontSize: 12,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#ced4da',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  placeholder: {
    color: '#6c757d',
  },
});

export default ExpenseForm;