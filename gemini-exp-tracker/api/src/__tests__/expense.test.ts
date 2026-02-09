const request = require('supertest');
const { app, mongoose } = require('../app');
const { ExpenseCategory } = require('../models/expense.model');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;
let mongoConnection;

describe('Expense API Integration Tests', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
    mongoConnection = mongoose;
  });

  afterEach(async () => {
    // Clear all collections after each test
    const collections = await mongoConnection.connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
  });

  afterAll(async () => {
    await mongoConnection.disconnect();
    await mongoServer.stop();
  });

  let createdExpenseId;

  it('should create a new expense', async () => {
    const newExpense = {
      title: 'Dinner',
      description: 'Dinner with friends',
      amount: 45.50,
      category: ExpenseCategory.Food,
      spentOnDate: '2024-02-10',
    };

    const res = await request(app)
      .post('/expenses')
      .send(newExpense)
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe(newExpense.title);
    expect(res.body.amount).toBe(newExpense.amount);
    createdExpenseId = res.body._id; // Store _id for subsequent tests
  });

  it('should get all expenses', async () => {
    const newExpense = {
      title: 'Dinner',
      description: 'Dinner with friends',
      amount: 45.50,
      category: ExpenseCategory.Food,
      spentOnDate: '2024-02-10',
    };
    await request(app).post('/expenses').send(newExpense);

    const res = await request(app)
      .get('/expenses')
      .expect(200);

    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe('Dinner');
  });

  it('should get expense by ID', async () => {
    const newExpense = {
      title: 'Dinner',
      description: 'Dinner with friends',
      amount: 45.50,
      category: ExpenseCategory.Food,
      spentOnDate: '2024-02-10',
    };
    const createdExpense = await request(app).post('/expenses').send(newExpense);
    const expenseId = createdExpense.body._id;

    const res = await request(app)
      .get(`/expenses/${expenseId}`)
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body._id).toBe(expenseId);
  });

  it('should update an expense by ID', async () => {
    const newExpense = {
      title: 'Dinner',
      description: 'Dinner with friends',
      amount: 45.50,
      category: ExpenseCategory.Food,
      spentOnDate: '2024-02-10',
    };
    const createdExpense = await request(app).post('/expenses').send(newExpense);
    const expenseId = createdExpense.body._id;

    const updatedData = {
      amount: 50.00,
      description: 'Updated dinner description',
    };

    const res = await request(app)
      .put(`/expenses/${expenseId}`)
      .send(updatedData)
      .expect(200);

    expect(res.body.amount).toBe(updatedData.amount);
    expect(res.body.description).toBe(updatedData.description);
  });

  it('should delete an expense by ID', async () => {
    const newExpense = {
      title: 'Dinner',
      description: 'Dinner with friends',
      amount: 45.50,
      category: ExpenseCategory.Food,
      spentOnDate: '2024-02-10',
    };
    const createdExpense = await request(app).post('/expenses').send(newExpense);
    const expenseId = createdExpense.body._id;

    await request(app)
      .delete(`/expenses/${expenseId}`)
      .expect(204);

    await request(app)
      .get(`/expenses/${expenseId}`)
      .expect(404); // Should not find the deleted expense
  });

  it('should filter expenses by category', async () => {
    // Create expenses of different categories
    await request(app)
      .post('/expenses')
      .send({ title: 'Lunch', amount: 15.00, category: ExpenseCategory.Food, spentOnDate: '2024-02-11' });
    await request(app)
      .post('/expenses')
      .send({
        title: 'Flight',
        description: 'Business trip',
        amount: 300.00,
        category: ExpenseCategory.Travel,
        spentOnDate: '2024-02-15',
      })
      .expect(201);

    const res = await request(app)
      .get(`/expenses?category=${ExpenseCategory.Travel}`)
      .expect(200);

    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0].category).toBe(ExpenseCategory.Travel);
  });

  it('should sort expenses by amount descending', async () => {
    // Create multiple expenses for sorting
    await request(app)
      .post('/expenses')
      .send({ title: 'Coffee', amount: 5.00, category: ExpenseCategory.Food, spentOnDate: '2024-02-11' });
    await request(app)
      .post('/expenses')
      .send({ title: 'Book', amount: 25.00, category: ExpenseCategory.Others, spentOnDate: '2024-02-12' });

    const res = await request(app)
      .get('/expenses?sortBy=amount&sortOrder=desc')
      .expect(200);

    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(1);
    expect(res.body[0].amount).toBeGreaterThanOrEqual(res.body[1].amount); // Basic check for sorting
  });
});
