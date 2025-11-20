import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    // Check if MongoDB URL exists
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL environment variable is not set");
    }

    console.log("Attempting to connect to MongoDB...");

    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Database Connected Successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    throw error; // Re-throw to handle in the main application
  }
};
