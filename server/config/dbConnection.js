const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB connection successful");
  } catch (err) {
    console.error("DB connection error:", err);
  }
};
