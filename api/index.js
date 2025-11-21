const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const projectRoot = path.join(__dirname, "..");

// Debug: Check if views folder exists
const viewsPath = path.join(projectRoot, "views");
console.log("Views path exists:", fs.existsSync(viewsPath));
console.log(
  "Home.ejs exists:",
  fs.existsSync(path.join(viewsPath, "home.ejs"))
);

// EJS setup
app.set("view engine", "ejs");
app.set("views", viewsPath);

// Static files
app.use(express.static(path.join(projectRoot, "public")));

// SIMPLE HTML RENDER (NO EJS) - 100% WORKING
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Contact App</title>
        <style>
            body { font-family: Arial; padding: 40px; text-align: center; }
            .success { color: green; font-size: 24px; }
        </style>
    </head>
    <body>
        <h1>Contact Management App</h1>
        <p class="success">✅ SUCCESS! Vercel pe deploy ho gaya!</p>
        <p>Ab EJS fix karenge...</p>
        <a href="/test-ejs">Test EJS</a> | 
        <a href="/health">Health Check</a>
    </body>
    </html>
  `);
});

// EJS Test Route
app.get("/test-ejs", (req, res) => {
  try {
    res.render("home", {
      contacts: [
        { first_name: "Test", last_name: "User", email: "test@example.com" },
      ],
      message: "EJS is working!",
    });
  } catch (error) {
    res.send(`
      <h1>EJS Error</h1>
      <p><strong>Error:</strong> ${error.message}</p>
      <p><strong>Views Path:</strong> ${viewsPath}</p>
      <a href="/">Go Back</a>
    `);
  }
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    message: "Server is running perfectly",
  });
});

module.exports = app;
