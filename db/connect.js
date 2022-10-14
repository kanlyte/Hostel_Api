const mongoose = require("mongoose");
require("dotenv/config");

const ConnectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database Connected Successfully...");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = ConnectDB;
