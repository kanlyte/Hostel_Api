const mongoose = require("mongoose");
require("dotenv/config");

const ConnectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("DATABASE IS CONNECTED SUCCESSFULLY......"))
    .catch((err) => console.log(err));
};

module.exports = ConnectDB;
