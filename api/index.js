import express from "express";
import ContactRoutes from "../routes/contacts.routes.js";
import { connectDB } from "../config/database.js";

connectDB(); // MongoDB

const app = express();

// View engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

// Routes
app.use("/", ContactRoutes);

// ❌ REMOVE app.listen()
// Vercel handles the server automatically

export default app; // ✅ REQUIRED for Vercel
