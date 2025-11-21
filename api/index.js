import express from "express";
import serverless from "serverless-http";
import ContactRoutes from "../routes/contacts.routes.js";
import { connectDB } from "../config/database.js";
import dotenv from "dotenv";

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

// Routes - using your exact route structure
app.use("/", ContactRoutes);

// Health check for Vercel
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Contact App is running on Vercel",
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
