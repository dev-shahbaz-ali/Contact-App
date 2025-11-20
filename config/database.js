import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const connectDB = async () => {
  try {
    // Check if MONGODB_URL exists
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ Database Connected Successfully");
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    process.exit(1);
  }
};
