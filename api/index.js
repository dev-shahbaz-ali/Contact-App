const express = require("express");
const path = require("path");

const app = express();
const projectRoot = path.join(__dirname, "..");

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(projectRoot, "views"));

// Static files
app.use(express.static(path.join(projectRoot, "public")));

// Simple EJS test
app.get("/", (req, res) => {
  try {
    res.render("home", {
      contacts: [
        { first_name: "John", last_name: "Doe", email: "john@test.com" },
        { first_name: "Jane", last_name: "Smith", email: "jane@test.com" },
      ],
      message: "EJS is working!",
    });
  } catch (error) {
    res.send(`
      <h1>EJS Error</h1>
      <p>${error.message}</p>
    `);
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "EJS test" });
});

module.exports = app;
