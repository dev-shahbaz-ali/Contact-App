import express from "express";
import serverless from "serverless-http";
import ContactRoutes from "../routes/contacts.routes.js";
import { connectDB } from "../config/database.js";
import path from "path";
import { fileURLToPath } from "url";

// Fix for ES modules __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Set view engine and views path
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());

// Initialize database connection
let dbConnected = false;

// Database connection middleware
app.use(async (req, res, next) => {
  if (!dbConnected) {
    try {
      await connectDB();
      dbConnected = true;
    } catch (error) {
      console.error("Database connection failed:", error);
      return res.status(500).json({
        error: "Database connection failed",
        message: error.message,
      });
    }
  }
  next();
});

// Routes - prefix with /api
app.use("/api", ContactRoutes);

// Root route redirect to API
app.get("/", (req, res) => {
  res.redirect("/api/");
});

// Health check route (without database dependency)
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    database: dbConnected ? "Connected" : "Disconnected",
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);
  res.status(500).json({
    error: "Internal Server Error",
    message: error.message,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Export the serverless handler
const handler = serverless(app);

export default handler;
