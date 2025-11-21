const express = require("express");
const path = require("path");
const { connectDB } = require("../config/database.js");
const Contact = require("../models/contacts.models.js");

const app = express();
const projectRoot = path.join(__dirname, "..");

// Setup
app.set("view engine", "ejs");
app.set("views", path.join(projectRoot, "views"));
app.use(express.static(path.join(projectRoot, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database (non-blocking)
connectDB();

// Routes
app.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().limit(5);
    res.render("home", {
      contacts: contacts,
      message: "Database connected!",
    });
  } catch (error) {
    res.render("home", {
      contacts: [],
      message: "No database connection",
    });
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

module.exports = app;
