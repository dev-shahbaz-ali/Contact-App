const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(`
    <h1>Contact App</h1>
    <p>✅ Successfully deployed on Vercel!</p>
    <a href="/health">Health Check</a>
  `);
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Everything is working perfectly",
  });
});

module.exports = app;
