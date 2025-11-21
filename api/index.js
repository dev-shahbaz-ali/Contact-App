const express = require("express");
const path = require("path");
const { connectDB } = require("../config/database.js");
const contactRoutes = require("../routes/contacts.routes.js");

const app = express();
const projectRoot = path.join(__dirname, "..");

app.set("view engine", "ejs");
app.set("views", path.join(projectRoot, "views"));
app.use(express.static(path.join(projectRoot, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/", contactRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

module.exports = app;
