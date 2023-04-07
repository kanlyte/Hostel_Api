const express = require("express");
const app = express();
const { Hostel } = require("./models/model");
const nodemailer = require("nodemailer");
const {
  addhostel,
  registeruser,
  registeradmin,
  pendinghostel,
  edithostel,
  confirmedhostel,
  deletehostel,
  loginadmin,
  newlandlord,
  userlogin,
  ownerlogin,
  deleteOwner,
  allOwners,
  resetOwner,
  allhostel,
  onehostel,
  ownerhostels,
  availaberooms,
  bookedrooms,
  deleteroom,
  editroom,
  addroom,
  getbookings,
  addbooking,
  allrooms,
  updatebooked,
  deleteallbookings,
  newslettersubscription,
  deletebook,
  reversebook,
  changebook,
  allreviews,
  newreviews,
  contact_us,
  allcontactus,
  hostelreviews,
} = require("./routes/route");
const ConnectDB = require("./db/connect");
const cors = require("cors");
const port = process.env.PORT || 5051;

app.use(cors()); //i also put cors like to access cross origin sites
app.use(express.json());

//Cors Configuration - Start
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE");
    return res.status(200).json({});
  }
  next();
});
//Cors Configuration - End

// get api
app.get("/", (req, res) => {
  // res.redirect("https://kanlyte.com");
  res.send("Don't you think you are out of place ............");
});

//user apis
app.use("api/v6/", registeruser);
app.use("api/v6/", userlogin);

//hostel owner apis
app.use("api/v6/", ownerlogin);
app.use("api/v6/", ownerhostels);

//admin apis
app.use("/api/v6/", registeradmin);
app.use("/api/v6/", loginadmin);
app.use("/api/v6/", newlandlord);
app.use("/api/v6/", deleteOwner);
app.use("/api/v6/", allOwners);
app.use("/api/v6/", resetOwner);

//hostel apis
app.use("/api/v6/", addhostel);
app.use("api/v6/", confirmedhostel);
app.use("/api/v6/", pendinghostel);
app.use("api/v6/", edithostel);
app.use("api/v6/", deletehostel);
app.use("api/v6/", allhostel);
app.use("api/v6/", onehostel);

//room apis
app.use("api/v6/", addroom);
app.use("api/v6/", availaberooms);
app.use("api/v6/", bookedrooms);
app.use("api/v6/", deleteroom);
app.use("api/v6/", editroom);
app.use("api/v6/", allrooms);

//booking apis
app.use("api/v6/", getbookings);
app.use("api/v6/", addbooking);
app.use("api/v6/", updatebooked);
app.use("api/v6/", deleteallbookings);
app.use("api/v6/", deletebook);
app.use("api/v6/", reversebook);
app.use("api/v6/", changebook);

//newsletter
app.use("api/v6/", newslettersubscription);

// reviews
app.use("api/v6/", allreviews);
app.use("api/v6/", newreviews);
app.use("api/v6/", hostelreviews);

// contact us
app.use("api/v6/", contact_us);
app.use("api/v6", allcontactus);

//database connectivity
ConnectDB();

app.listen(port, console.log(`server started on port: ${port}.......`));
