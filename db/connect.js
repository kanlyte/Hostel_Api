const mongoose = require("mongoose");
const MONGO_URI =
  "mongodb+srv://BrianGaston:gast2019@hostelmangementsystem.9ccov.mongodb.net/Hostel-API?retryWrites=true&w=majority";
// require("dotenv/config");

const ConnectDB = () => {
  mongoose
    .connect(MONGO_URI, {
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
