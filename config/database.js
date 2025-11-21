const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGODB_URI;

    if (!mongoURL) {
      console.log("❌ No MongoDB URL found in environment variables");
      console.log("ℹ️ Please set MONGODB_URI in Vercel dashboard");
      return;
    }

    console.log("🔄 Connecting to MongoDB...");

    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.log("❌ MongoDB connection failed:", error.message);
    console.log("🔄 Running in demo mode without database");
  }
};

module.exports = { connectDB };
