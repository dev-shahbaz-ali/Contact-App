const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGODB_URI;
    if (mongoURL) {
      await mongoose.connect(mongoURL);
      console.log("MongoDB connected");
    }
  } catch (error) {
    // Silent fail
  }
};

module.exports = { connectDB };
