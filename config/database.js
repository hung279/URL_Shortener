const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(
      process.env.DB_LOCALHOST || "mongodb://127.0.0.1:27017/url-shortener",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = connectDB;
