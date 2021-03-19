const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log(`mongoose connected`);
  } catch (err) {
    console.log(`error:${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
