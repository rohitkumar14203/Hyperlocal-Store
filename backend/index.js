import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import router from "./routes/router.js";

const PORT = process.env.PORT || 8000;

const app = express();

connectDB();

app.use(
  cors({
    origin: "https://hyperlocal-store-eight.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
