const express = require("express");
const app = express();
const { Hostel } = require("./models/model");
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
} = require("./routes/route");
const ConnectDB = require("./db/connect");
const cors = require("cors");
const port = process.env.PORT || 5055;

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
  res.send("This is an api for my app.");
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

//booking apis
app.use("api/v6", getbookings);
app.use("api/v6", addbooking);

//database connectivity
ConnectDB();

app.listen(port, console.log(`server started on port: ${port}.......`));
