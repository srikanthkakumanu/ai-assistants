import { z } from "zod";

const expenseCategoryEnum = z.enum(["Food", "Travel", "Utilities", "Others"]);

export const createExpenseSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    amount: z.number().positive("Amount must be a positive number"),
    category: expenseCategoryEnum,
    spentOnDate: z.string().datetime("Spent on date must be a valid date string"),
  }),
});

export const updateExpenseSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").optional(),
    description: z.string().optional(),
    amount: z.number().positive("Amount must be a positive number").optional(),
    category: expenseCategoryEnum.optional(),
    spentOnDate: z.string().datetime("Spent on date must be a valid date string").optional(),
  }),
  params: z.object({
    id: z.string().uuid("Invalid expense ID format"),
  }),
});

export const getExpenseByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid expense ID format"),
  }),
});

export const deleteExpenseSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid expense ID format"),
  }),
});

