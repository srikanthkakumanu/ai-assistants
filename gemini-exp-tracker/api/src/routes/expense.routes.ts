const { Router } = require('express');
const {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} = require('../controllers/expense.controller');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Expenses
 *   description: Expense management API
 */

/**
 * @swagger
 * /expenses:
 *   post:
 *     summary: Create a new expense
 *     tags: [Expenses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *               - category
 *               - spentOnDate
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Groceries"
 *               description:
 *                 type: string
 *                 example: "Weekly grocery shopping"
 *               amount:
 *                 type: number
 *                 format: float
 *                 example: 55.75
 *               category:
 *                 type: string
 *                 enum: [Food, Travel, Utilities, Others]
 *                 example: "Food"
 *               spentOnDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-01-20"
 *     responses:
 *       201:
 *         description: Expense created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/', createExpense);

/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Get all expenses
 *     tags: [Expenses]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [Food, Travel, Utilities, Others]
 *         description: Filter expenses by category
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [amount, spentOnDate, createdAt]
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Sort order (asc or desc)
 *     responses:
 *       200:
 *         description: List of expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expense'
 *       500:
 *         description: Server error
 */
router.get('/', getExpenses);

/**
 * @swagger
 * /expenses/{id}:
 *   get:
 *     summary: Get an expense by ID
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the expense to retrieve
 *     responses:
 *       200:
 *         description: Expense details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       400:
 *         description: Invalid expense ID format
 *       404:
 *         description: Expense not found
 *       500:
 *         description: Server error
 */
router.get('/:id', getExpenseById);

/**
 * @swagger
 * /expenses/{id}:
 *   put:
 *     summary: Update an expense by ID
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the expense to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Groceries"
 *               description:
 *                 type: string
 *                 example: "Updated weekly grocery shopping"
 *               amount:
 *                 type: number
 *                 format: float
 *                 example: 60.50
 *               category:
 *                 type: string
 *                 enum: [Food, Travel, Utilities, Others]
 *                 example: "Food"
 *               spentOnDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-01-25"
 *     responses:
 *       200:
 *         description: Expense updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       400:
 *         description: Invalid input or invalid expense ID format
 *       404:
 *         description: Expense not found
 *       500:
 *         description: Server error
 */
router.put('/:id', updateExpense);

/**
 * @swagger
 * /expenses/{id}:
 *   delete:
 *     summary: Delete an expense by ID
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the expense to delete
 *     responses:
 *       204:
 *         description: Expense deleted successfully
 *       400:
 *         description: Invalid expense ID format
 *       404:
 *         description: Expense not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', deleteExpense);

module.exports = router;


