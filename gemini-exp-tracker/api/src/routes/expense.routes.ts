import { Router } from "express";
import {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getCategorySpendingSummary,
} from "../controllers/expense.controller.js";
import { validate } from "../middlewares/validateRequest.js";
import {
  createExpenseSchema,
  updateExpenseSchema,
  getExpenseByIdSchema,
  deleteExpenseSchema,
} from "../schemas/expense.schema.js";

const router = Router();

router.post("/", validate(createExpenseSchema), createExpense);
router.get("/", getAllExpenses);
router.get("/summary", getCategorySpendingSummary); // New route for category spending summary
router.get("/:id", validate(getExpenseByIdSchema), getExpenseById);
router.put("/:id", validate(updateExpenseSchema), updateExpense);
router.delete("/:id", validate(deleteExpenseSchema), deleteExpense);

export default router;