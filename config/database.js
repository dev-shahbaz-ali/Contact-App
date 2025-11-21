const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGODB_URI;

    if (!mongoURL) {
      throw new Error("No MongoDB URL provided");
    }

    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.log("❌ MongoDB connection failed:", error.message);
    // Don't throw - let app continue
  }
};

module.exports = { connectDB };
