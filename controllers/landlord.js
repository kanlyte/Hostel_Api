const { Hostel, LandLord, Rooms, LandLordRequest } = require("../models/model");

// request for becoming a landlord
const landlord_request = async (req, res) => {
  try {
    const email_check = await LandLordRequest.findOne({
      email: { $eq: req.body.email },
    });
    if (email_check) {
      res.send({ data: "Email already used by another user", status: false });
    } else {
      const request = new LandLordRequest({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
      });
      const save_request = await request.save();
      res.send({
        status: true,
        data: "Become landlord request sent",
        result: save_request,
      });
    }
  } catch (error) {
    res.send({
      data: "Un expected error",
      result: error,
      status: false,
    });
  }
};

// getting all requests to become a landlord

const all_landlord_requests = async (req, res) => {
  try {
    const landlord = await LandLordRequest.find();
    res.send({
      status: true,
      result: landlord,
      data: "All requests available",
    });
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

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

//getting hostels of a certain hostel owner
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

module.exports = {
  owner_login,
  owner_hostels,
  landlord_rooms,
  landlord_request,
  all_landlord_requests,
};
