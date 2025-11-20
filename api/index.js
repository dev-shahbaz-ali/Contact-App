import express from "express";
import serverless from "serverless-http";
import ContactRoutes from "../routes/contacts.routes.js";
import { connectDB } from "../config/database.js";
import path from "path";
import { fileURLToPath } from "url";

// Fix for ES modules __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();

const app = express();

// Set view engine and views path
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());

// Routes - prefix with /api
app.use("/api", ContactRoutes);

// Root route redirect to API
app.get("/", (req, res) => {
  res.redirect("/api/");
});

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// Catch all handler for Vercel
app.use((req, res) => {
  res.status(404).render("404", { message: "Page not found" });
});

export default serverless(app);
