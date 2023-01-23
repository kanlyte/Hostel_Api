// const router = require("express").Router();
const { Admin, HostelOwner, LandLord } = require("../models/model");

/*
  The admin details shall be hard coded meaning here we 
  only have one route of creating a landlord 

  we shall look into authentication and password reset of a landlord
*/

//the brain for registering an admin
const register_admin = async (req, res) => {
  const email = await Admin.findOne({
    email: { $eq: req.body.email },
  });
  if (!email) {
    const admin = new Admin({
      full_name: req.body.full_name,
      phone_number: req.body.phone_number,
      email: req.body.email,
      password: req.body.password,
      confirm_password: req.body.confirm_password,
    });
    try {
      const save_added_admin = await admin.save();
      res.send({
        status: true,
        data: "Admin registered Successfully",
        result: save_added_admin,
      });
    } catch (error) {
      res.send({
        status: false,
        data: "An Error Occured.............",
        result: error,
      });
    }
  } else {
    res.send({ data: "email already used ", status: false });
  }
};

//the brain for login of admin
const admin_login = async (req, res) => {
  if (
    req.body.email === "nahuriragaston@gmail.com" &&
    req.body.password === "gast@2019"
  ) {
    res.send({ status: true, role: "admin", user: { username: "admin" } });
  } else {
    try {
      const current_hostel_owner = await LandLord.findOne({
        $and: [
          { email: req.body.email },
          {
            password: req.body.password,
          },
        ],
      });
      current_hostel_owner
        ? res.send({
            user: current_hostel_owner,
            role: "landlord",
            status: true,
          })
        : res.send({ status: false, data: "Wrong Details" });
    } catch (error) {
      console.log(error);
      res.send({
        status: false,
        data: "An Error Occured",
      });
    }
  }
};

//the brain for registering a hostel owner
const new_landlord = async (req, res) => {
  const email = await LandLord.findOne({
    email: { $eq: req.body.email },
  });
  if (email) {
    res.send({ data: "email already exists", status: false });
  } else {
    const landlord = new LandLord({
      name: req.body.name,
      hostel: req.body.hostel,
      phone_number: req.body.phone_number,
      email: req.body.email,
      password: req.body.password,
      confirmed: true,
    });
    try {
      const save_added_owner = await landlord.save();
      res.send({
        status: true,
        data: "Hostel Owner Added",
        user: save_added_owner,
        role: "landlord",
      });
    } catch (error) {
      res.send({
        status: false,
        data: "An Error Occured.............",
        result: error,
      });
    }
  }
};

// the controller that gets all hostel owners  for display
const all_hostel_owners = async (req, res) => {
  try {
    const hostel_owners = await LandLord.find();
    res.send({ status: true, result: hostel_owners });
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

//delets a given hostelowner by id
const delete_hostel_owner = async (req, res) => {
  try {
    const current_hostel_owner = await HostelOwner.findById(req.params.id);
    if (current_hostel_owner) {
      const removed_hostel_owner = await HostelOwner.deleteOne({
        _id: req.params.id,
      });
      res.send({
        status: true,
        data: "deleted",
        result: removed_hostel_owner,
      });
    } else {
      res.send({
        status: true,
        data: "Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

//controller for editing hostel owners
const edit_hostel_owner = async (req, res) => {
  try {
    const current_hostel_owner = await HostelOwner.findById(req.params.id);
    const updated_hostel_owner = await HostelOwner.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          name: req.body.name || current_hostel_owner.name,
          hostel: req.body.hostel || current_hostel_owner.hostel,
          phone_number:
            req.body.phone_number || current_hostel_owner.phone_number,
          email: req.body.email || current_hostel_owner.email,
          password: req.body.password || current_hostel_owner.password,
        },
      }
    );
    res.send({
      status: true,
      data: "Reset Successful",
      result: updated_hostel_owner,
    });
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

module.exports = {
  register_admin,
  admin_login,
  delete_hostel_owner,
  new_landlord,
  all_hostel_owners,
  edit_hostel_owner,
};
