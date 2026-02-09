const express = require('express');
const mongoose = require('mongoose');
const expenseRoutes = require('./routes/expense.routes'); // Import expense routes
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger'); // Import the swagger specification
const cors = require('cors'); // Import cors middleware
const { Request, Response } = require('express'); // Import Request and Response types

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/expensetracker';

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Expense routes
app.use('/expenses', expenseRoutes);

app.get('/', (req: typeof Request, res: typeof Response) => {
  res.send('Hello, World from Expense Tracker API!');
});

const connectToMongo = async () => {
  try {
    // Cast mongoose to any to resolve type conflicts if they arise during CommonJS conversion
    await (mongoose).connect(mongoUri);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit with failure code
  }
};

// Start the server only if this file is run directly (not imported as a module)
if (process.env.NODE_ENV !== 'test') {
  connectToMongo().then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  });
}

// Export app and connectToMongo for testing purposes
module.exports = { app, connectToMongo, mongoose };

