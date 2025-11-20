import express from "express";
import serverless from "serverless-http"; // Import serverless adapter
import ContactRoutes from "./routes/contacts.routes.js";
import { connectDB } from "./config/database.js";

// Initialize Express
const app = express();

// Database Connection
connectDB();

// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

// Routes
app.use("/", ContactRoutes);

// Export as serverless function
export default serverless(app);
