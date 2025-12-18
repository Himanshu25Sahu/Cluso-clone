import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRoutes } from "./routes/authRoutes.js";
import { projectRouter } from "./routes/projectRoutes.js";
import dotenv from "dotenv";
dotenv.config();  

export const app = express();

// Middlewares
console.log(process.env.FRONTEND_URL)
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true}
));
app.use(express.json());
app.use(cookieParser());

// Health check
app.get("/", (req, res) => {
  res.status(200).json({ message: "Clueso Clone API is running" });
});

app.use('/auth',authRoutes);
app.use('/projects',projectRouter);

