const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGODB_URI;

    if (!mongoURL) {
      console.log("No MongoDB URL - Running without database");
      return;
    }

    // Add timeout to prevent hanging
    await mongoose.connect(mongoURL, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.log("❌ MongoDB connection failed - Running without database");
    // Don't throw error - app will work without DB
  }
};

module.exports = { connectDB };
