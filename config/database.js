const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGODB_URI;

    if (mongoURL) {
      await mongoose.connect(mongoURL, {
        serverSelectionTimeoutMS: 3000,
      });
      console.log("Database connected");
    } else {
      console.log("No database URL - running in demo mode");
    }
  } catch (error) {
    console.log("Running without database - demo mode");
  }
};

module.exports = { connectDB };
