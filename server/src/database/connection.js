const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const mongoURL = process.env.MONGO_URL;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURL);
  } catch (error) {
    throw error;
  }
};

const conn = mongoose.connection;

module.exports = { connectToMongo, conn };
