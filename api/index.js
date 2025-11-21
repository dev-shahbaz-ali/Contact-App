const express = require("express");
const path = require("path");
const ContactRoutes = require("../routes/contacts.routes.js");
const { connectDB } = require("../config/database.js");

const app = express();
const projectRoot = path.join(__dirname, "..");

// Setup
app.set("view engine", "ejs");
app.set("views", path.join(projectRoot, "views"));
app.use(express.static(path.join(projectRoot, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
connectDB();

// Routes
app.use("/", ContactRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

module.exports = app;
