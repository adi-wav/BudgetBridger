const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB connected... ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`MongoDB Error: ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;