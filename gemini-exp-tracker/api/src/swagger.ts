const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Expense Tracker API',
      version: '1.0.0',
      description: 'A simple CRUD API for managing expenses.',
    },
    servers: [
      {
        url: 'http://localhost:30001',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Expense: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique identifier for the expense',
            },
            title: {
              type: 'string',
              description: 'Title of the expense',
            },
            description: {
              type: 'string',
              description: 'Description of the expense',
            },
            amount: {
              type: 'number',
              format: 'float',
              description: 'Amount of the expense',
            },
            category: {
              type: 'string',
              enum: ['Food', 'Travel', 'Utilities', 'Others'],
              description: 'Category of the expense',
            },
            spentOnDate: {
              type: 'string',
              format: 'date',
              description: 'Date when the expense was incurred',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp of when the expense was created',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp of when the expense was last updated',
            },
          },
          required: ['id', 'title', 'amount', 'category', 'spentOnDate'],
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
