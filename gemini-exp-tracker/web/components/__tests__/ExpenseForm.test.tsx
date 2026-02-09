import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExpenseForm from '../ExpenseForm';
import { createExpense, updateExpense } from '@/lib/api';

// Mock the API calls
jest.mock('@/lib/api', () => ({
  createExpense: jest.fn(),
  updateExpense: jest.fn(),
}));

describe('ExpenseForm', () => {
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly for adding a new expense', () => {
    render(<ExpenseForm />);

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Amount/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Expense/i)).toBeInTheDocument();
  });

  it('renders correctly for editing an existing expense', () => {
    const initialExpense = {
      id: '123',
      title: 'Old Title',
      description: 'Old Description',
      amount: 25.50,
      category: 'Food',
      spentOnDate: '2024-01-15T00:00:00.000Z',
    };
    render(<ExpenseForm initialData={initialExpense} />);

    expect(screen.getByLabelText(/Title/i)).toHaveValue('Old Title');
    expect(screen.getByLabelText(/Amount/i)).toHaveValue("25.50");
    expect(screen.getByText(/Update Expense/i)).toBeInTheDocument();
  });

  it('submits new expense data correctly', async () => {
    (createExpense as jest.Mock).mockResolvedValueOnce({}); // Mock successful API call

    render(<ExpenseForm onSuccess={mockOnSuccess} />);

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'New Test Expense' } });
    fireEvent.change(screen.getByLabelText(/Amount/i), { target: { value: '100.00' } });
    fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'Travel' } });
    fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2024-02-20' } });

    fireEvent.click(screen.getByText(/Add Expense/i));

    await waitFor(() => {
      expect(createExpense).toHaveBeenCalledTimes(1);
      expect(createExpense).toHaveBeenCalledWith({
        title: 'New Test Expense',
        description: '', // Default empty string
        amount: 100,
        category: 'Travel',
        spentOnDate: '2024-02-20',
      });
      expect(mockOnSuccess).toHaveBeenCalledTimes(1);
    });
  });

  it('submits updated expense data correctly', async () => {
    (updateExpense as jest.Mock).mockResolvedValueOnce({}); // Mock successful API call

    const initialExpense = {
      id: '123',
      title: 'Old Title',
      description: 'Old Description',
      amount: 25.50,
      category: 'Food',
      spentOnDate: '2024-01-15T00:00:00.000Z',
    };
    render(<ExpenseForm initialData={initialExpense} onSuccess={mockOnSuccess} />);

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Updated Title' } });
    fireEvent.click(screen.getByText(/Update Expense/i));

    await waitFor(() => {
      expect(updateExpense).toHaveBeenCalledTimes(1);
      expect(updateExpense).toHaveBeenCalledWith('123', {
        title: 'Updated Title',
        description: 'Old Description',
        amount: 25.5,
        category: 'Food',
        spentOnDate: '2024-01-15',
      });
      expect(mockOnSuccess).toHaveBeenCalledTimes(1);
    });
  });

  it('shows validation errors for invalid input', async () => {
    render(<ExpenseForm />);

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Amount/i), { target: { value: 'abc' } });

    fireEvent.click(screen.getByText(/Add Expense/i));

    await waitFor(() => {
      expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Invalid amount format/i)).toBeInTheDocument();
      expect(createExpense).not.toHaveBeenCalled(); // API should not be called
    });
  });
});
