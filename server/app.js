import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRoutes } from "./routes/authRoutes.js";
import { projectRouter } from "./routes/projectRoutes.js";

export const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Health check
app.get("/", (req, res) => {
  res.status(200).json({ message: "Clueso Clone API is running" });
});

app.use('/auth',authRoutes);
app.use('/projects',projectRouter);

