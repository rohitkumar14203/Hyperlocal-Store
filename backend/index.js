import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import router from "./routes/router.js";

// Load environment variables

const PORT = process.env.PORT || 8000;
// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", router);

// Define port

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
