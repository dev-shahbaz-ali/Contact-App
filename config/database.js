const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGODB_URI || process.env.MONGODB_URL;

    if (!mongoURL) {
      console.log("No MongoDB URL - running without database");
      return null;
    }

    const conn = await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully");
    return conn;
  } catch (error) {
    console.log("MongoDB connection failed - running without database");
    return null;
  }
};

module.exports = { connectDB };
