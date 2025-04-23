const mongoose = require("mongoose");
const process = require("process");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

module.exports = connectDB;
