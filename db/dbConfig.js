const mongoose = require('mongoose');

const DB_URI = process.env.DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log('MongoDB Connected Successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
