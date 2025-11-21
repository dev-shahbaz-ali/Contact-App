const express = require("express");
const path = require("path");
const { connectDB } = require("../config/database.js");

const app = express();

// Vercel-specific paths
const projectRoot = path.join(__dirname, "..");

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(projectRoot, "views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(projectRoot, "public")));

// Database connection - NON-BLOCKING
connectDB()
  .then(() => {
    console.log("🚀 App started with database setup");
  })
  .catch(() => {
    console.log("🚀 App started in no-database mode");
  });

// Routes
app.get("/", (req, res) => {
  res.render("index", {
    title: "Home Page",
    message: "Welcome to Vercel MVC App!",
    databaseStatus: "Connected", // You can check actual status here
  });
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    database: "Connected", // Add actual DB status check
    timestamp: new Date().toISOString(),
  });
});

// Test route without database dependency
app.get("/test", (req, res) => {
  res.json({
    message: "API is working!",
    database: "Optional - app works without DB",
  });
});

module.exports = app;
