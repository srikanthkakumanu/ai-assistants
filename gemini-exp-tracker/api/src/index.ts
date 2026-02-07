import express from "express";
import cors from "cors";
import dotenv from "dotenv"; // Import dotenv
import { connectDB } from "./config/database.js";
import expenseRoutes from "./routes/expense.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;
const corsOrigin = process.env.CORS_ORIGIN || "*"; // Get CORS origin from env, default to all

app.use(express.json());
app.use(cors({ origin: corsOrigin })); // Use configurable CORS origin

// Use expense routes
app.use("/expenses", expenseRoutes);

// Error handling middleware
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Expense Tracker API is running!");
});

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

startServer();