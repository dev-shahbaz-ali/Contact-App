import express from "express";
import serverless from "serverless-http";
import ContactRoutes from "../routes/contacts.routes.js";
import { connectDB } from "../config/database.js";

// connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/contacts", ContactRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "API is running successfully on Vercel!" });
});

// Export serverless handler for Vercel
export const handler = serverless(app);
