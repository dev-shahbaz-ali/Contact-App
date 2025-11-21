import express from "express";
import serverless from "serverless-http";
import ContactRoutes from "../routes/contacts.routes.js";
import { connectDB } from "../config/database.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Fix for ES modules __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware - Fix paths for Vercel
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views")); // Absolute path
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public"))); // Absolute path
app.use(express.json());

// Routes
app.use("/", ContactRoutes);

// Health check with database status
app.get("/health", async (req, res) => {
  const dbStatus =
    mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";

  res.json({
    status: "OK",
    message: "Contact App is running on Vercel",
    timestamp: new Date().toISOString(),
    database: dbStatus,
    environment: process.env.NODE_ENV || "development",
  });
});

// Simple test route without EJS
app.get("/test", (req, res) => {
  res.json({
    message: "✅ API is working!",
    timestamp: new Date().toISOString(),
  });
});

// Export for Vercel
const handler = serverless(app);
export { handler };
export default handler;

// Local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}
