import { Sequelize } from "sequelize-typescript";
import { Expense } from "../models/expense.model";

const sequelize = new Sequelize(
  process.env.DATABASE_URL || "postgres://user:password@db:5432/expense_tracker_db",
  {
    dialect: "postgres",
    logging: console.log, // Enable logging to see SQL queries in console
    models: [Expense], // Add the Expense model
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    await sequelize.sync({ alter: true }); // This will create/alter tables if they don't exist
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default sequelize;
