const router = require("express").Router();
const { Hostel, HostelOwner } = require("../models/model");

//the controller for adding a new hostel
const add_hostel = async (req, res) => {
  //checking whether the hostel already exist in the database
  const myhostel = await Hostel.findOne({
    hostel_name: { $eq: req.body.hostel_name },
  });

  if (!myhostel) {
    const hostel = new Hostel({
      hostel_name: req.body.hostel_name,
      hostel_distance: req.body.hostel_distance,
      hostel_description: req.body.hostel_description,
      single_room_amount: parseInt(req.body.single_room_amount),
      double_room_amount: parseInt(req.body.double_room_amount),
      telphone_number: req.body.telphone_number,
      single_rooms_available: req.body.single_rooms_available,
      double_rooms_available: req.body.double_rooms_available,
      booking_fee: parseInt(req.body.booking_fee),
      hostel_account_no: req.body.hostel_account_no,
      hostel_images: "",
      hostel_owner: req.body.hostel_owner,
      confirmed: false,
    });
    try {
      const save_added_hostel = await hostel.save();
      res.send({
        status: true,
        result: save_added_hostel,
        data: "Hostel Added",
      });
    } catch (error) {
      console.log(error);
      res.send({ status: false, data: "An Error Occured", result: error });
    }
  } else {
    res.send({ data: "Hostel Exists ", status: false });
  }
};

// the controller that gets pending hostels for display
const pending_hostel = async (req, res) => {
  try {
    const pending_hostel = await Hostel.find({ confirmed: { $eq: false } });
    res.send({ status: true, result: pending_hostel });
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

//controller for editing pending hostels  and confirming it to true.
const edit_hostel = async (req, res) => {
  try {
    const current_hostel = await Hostel.findById(req.params.id);
    const updated_hostel = await Hostel.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          hostel_name: req.body.hostel_name || current_hostel.hostel_name,
          hostel_distance:
            req.body.hostel_distance || current_hostel.hostel_distance,
          hostel_description:
            req.body.hostel_description || current_hostel.hostel_description,
          single_room_amount:
            req.body.single_room_amount || current_hostel.single_room_amount,
          double_room_amount:
            req.body.double_room_amount || current_hostel.double_room_amount,
          telphone_number:
            req.body.telphone_number || current_hostel.telphone_number,
          single_rooms_available:
            req.body.single_rooms_available ||
            current_hostel.single_rooms_available,
          double_rooms_available:
            req.body.double_rooms_available ||
            current_hostel.double_rooms_available,
          booking_fee: req.body.booking_fee || current_hostel.booking_fee,
          hostel_account_no:
            req.body.hostel_account_no || current_hostel.hostel_account_no,
            hostel_owner: current_hostel.hostel_owner,
            confirmed: req.body.confirmed || current_hostel.confirmed,
          //hostel images need to be acted upon
          hostel_images: req.body.hostel_images
          ? JSON.stringify(req.body.hostel_images)
          : current_hostel.hostel_images, 
        },
      }
    );
    res.send({
      status: true,
      data: "hostel edited Successfully",
      result: updated_hostel,
    });
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

//gets confirmed hostels

const confirmed_hostel = async (req, res) => {
  try {
    const confirmed_hostel = await Hostel.find({ confirmed: { $eq: true } });
    res.send({ status: true, result: confirmed_hostel });
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

//gets single hostel basing on the id
const single_hostel = async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);
    if (hostel) {
      const hostelowner = await HostelOwner.findById(hostel.hostel_owner);
      res.send({ status: true, result: { hostel, hostelowner } });
    } else {
      res.send({ status: false, data: "Hostel Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

//delets a given hostel by id
const delete_hostel = async (req, res) => {
  try {
    const current_hostel = await Hostel.findById(req.params.id);
    if (current_hostel) {
      const removed_hostel = await Hostel.deleteOne({ _id: req.params.id });
      res.send({
        status: true,
        data: "deleted",
        result: removed_hostel,
      });
    } else {
      res.send({
        status: true,
        data: "hostel not Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

module.exports = {
  add_hostel,
  pending_hostel,
  edit_hostel,
  confirmed_hostel,
  single_hostel,
  delete_hostel,
};
