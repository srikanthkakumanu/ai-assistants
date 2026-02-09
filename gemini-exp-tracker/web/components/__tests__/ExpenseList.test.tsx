import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExpenseList from '../ExpenseList';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getExpenses, deleteExpense, Expense } from '@/lib/api';
import React from 'react';

// Mock React Query hooks
jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(() => ({
    mutate: jest.fn(),
    isPending: false,
  })),
  useQueryClient: () => ({
    invalidateQueries: jest.fn(),
  }),
}));

// Mock API calls
jest.mock('@/lib/api', () => ({
  getExpenses: jest.fn(),
  deleteExpense: jest.fn(),
}));

jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  DialogTrigger: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  DialogContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogTitle: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
  DialogDescription: ({ children }: { children: React.ReactNode }) => <p>{children}</p>,
}));

const mockExpenses: Expense[] = [
  {
    id: '1',
    title: 'Coffee',
    description: 'Morning coffee',
    amount: 3.50,
    category: 'Food',
    spentOnDate: '2024-03-01T00:00:00.000Z',
  },
  {
    id: '2',
    title: 'Train Ticket',
    description: 'Commute to work',
    amount: 10.00,
    category: 'Travel',
    spentOnDate: '2024-03-02T00:00:00.000Z',
  },
];

describe('ExpenseList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    });

    render(<ExpenseList refreshKey={0} />);
    expect(screen.getByText(/Loading expenses.../i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error('Failed to fetch'),
    });

    render(<ExpenseList refreshKey={0} />);
    expect(screen.getByText(/Error: Failed to fetch/i)).toBeInTheDocument();
  });

  it('renders no expenses message', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
    });

    render(<ExpenseList refreshKey={0} />);
    expect(screen.getByText(/No expenses found. Add a new one above!/i)).toBeInTheDocument();
  });

  it('renders expenses correctly', async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockExpenses,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(<ExpenseList refreshKey={0} />);

    // Check for each expense item
    mockExpenses.forEach(expense => {
      expect(screen.getByText(expense.title)).toBeInTheDocument();
      expect(screen.getByText(expense.description!)).toBeInTheDocument();
      expect(screen.getByText(`$${expense.amount.toFixed(2)}`)).toBeInTheDocument();
    });
  });

  it('handles delete expense', async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockExpenses,
      isLoading: false,
      isError: false,
      error: null,
    });
    const mockMutate = jest.fn();
    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });

    render(<ExpenseList refreshKey={0} />);

    const deleteButtons = screen.getAllByRole('button', { name: /Delete/i });
    expect(deleteButtons).toHaveLength(mockExpenses.length);

    // Click the first delete button
    deleteButtons[0].click();

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledTimes(1);
      expect(mockMutate).toHaveBeenCalledWith('1'); // Expect to delete expense with id '1'
    });
  });

  // You can add more tests for filtering, sorting, and edit dialog interactions
});
