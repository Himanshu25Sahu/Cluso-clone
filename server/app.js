import express from "express";
import cors from "cors";

export const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.status(200).json({ message: "Clueso Clone API is running" });
});


