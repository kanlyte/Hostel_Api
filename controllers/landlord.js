const { Hostel, LandLord, Rooms } = require("../models/model");

//the brain for login of a hostel owner
const owner_login = async (req, res) => {
  try {
    const current_owner = await LandLord.find({
      $and: [{ password: req.body.password }, { email: req.body.email }],
    });
    if (current_owner) {
      res.send({ user: current_owner, status: true });
    } else {
      res.send({ status: false, data: "No matching details" });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};



const owner_hostels = async (req, res) => {
  try {
    const hostels = await Hostel.find({
      hostel_landlord: { $eq: req.params.id },
    });
    res.send({ status: true, result: hostels });
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

const landlord_rooms = async (req, res) => {
  try {
    const rooms = await Rooms.find({
      hostel_landlord: { $eq: req.params.id },
    });
    res.send({ status: true, result: rooms });
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};


module.exports = { owner_login, owner_hostels, landlord_rooms };
