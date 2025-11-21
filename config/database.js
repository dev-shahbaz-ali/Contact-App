const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGODB_URI || process.env.MONGODB_URL;

    if (!mongoURL) {
      console.log("ℹ️  No MongoDB URL - running in no-database mode");
      return null;
    }

    await mongoose.connect(mongoURL);
    console.log("✅ MongoDB connected successfully");
    return true;
  } catch (error) {
    console.log("⚠️  MongoDB not available - running without database");
    return null;
  }
};

module.exports = { connectDB };
