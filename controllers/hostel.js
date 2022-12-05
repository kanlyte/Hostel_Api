const { Hostel, LandLord, Rooms, Bookings } = require("../models/model");
const router = require("express").Router();

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
      hostel_landlord: req.body.landlord,
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
          hostel_landlord: current_hostel.hostel_landlord,
          confirmed: req.body.confirmed || current_hostel.confirmed,

          // hostel images need to be acted upon
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
//gets all hostels
const all_hostel = async (req, res) => {
  try {
    const hostels = await Hostel.find();
    res.send({ status: true, result: hostels });
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

//gets single hostel basing on the id
const one_hostel = async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);
    if (hostel) {
      const landlord = await LandLord.findById(hostel.hostel_landlord);
      res.send({
        status: true,
        result: { hostel, landlord },
      });
    } else {
      res.send({
        status: false,
        data: "No hostel found",
      });
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

//Adding a new room
const add_room = async (req, res) => {
  const myroom = await Rooms.findOne({
    $and: [
      { room_number: req.body.room_number },
      { hostel_id: req.body.hostel_id },
    ],
  });
  if (!myroom) {
    const room = new Rooms({
      hostel_id: req.body.hostel_id,
      room_type: req.body.room_type,
      room_number: parseInt(req.body.room_number),
      room_fee: parseInt(req.body.room_fee),
      room_description: req.body.room_description,
      booked: false,
    });
    try {
      const save_added_room = await room.save();
      res.send({
        status: true,
        result: save_added_room,
        data: "Room Added",
      });
    } catch (error) {
      console.log(error);
      res.send({ status: false, data: "An Error Occured", result: error });
    }
  } else {
    res.send({ data: "Room Exists ", status: false });
  }
};
//gets all rooms available and not available
const all_rooms = async (req, res) => {
  try {
    const rooms = await Rooms.find();
    res.send({
      status: true,
      result: rooms,
    });
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

//gets all rooms that are not taken
const availabe_rooms = async (req, res) => {
  try {
    const rooms = await Rooms.find({ booked: { $eq: false } });
    res.send({ status: true, result: rooms });
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};
//gets all rooms that are booked
const booked_rooms = async (req, res) => {
  try {
    const rooms = await Rooms.find({ booked: { $eq: true } });
    res.send({ status: false, result: rooms });
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

//controller for editing a room
const edit_room = async (req, res) => {
  try {
    const current_room = await Rooms.findById(req.params.id);
    const updated_room = await Rooms.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          room_type: req.body.room_type || current_room.room_type,
          room_number:
            parseInt(req.body.room_number) || current_room.room_number,
          room_fee: parseInt(req.body.room_fee) || current_room.room_fee,
          confirmed: true,

          // hostel images need to be acted upon
          room_image: req.body.room_image
            ? JSON.stringify(req.body.room_image)
            : current_image.room_image,
        },
      }
    );
    res.send({
      status: true,
      data: "room updated",
      result: updated_room,
    });
  } catch {
    console.log(error);
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};
//delets a given room by id
const delete_room = async (req, res) => {
  try {
    const current_room = await Rooms.findById(req.params.id);
    if (current_room) {
      const removed_room = await Rooms.deleteOne({ _id: req.params.id });
      res.send({
        status: true,
        data: "deleted",
        result: removed_room,
      });
    } else {
      res.send({
        status: true,
        data: "room not Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

// controller for booking a new room

const book_room = async (req, res) => {
  const myroom = await Rooms.findOne({
    //checking whether the room exists in the particular hostel
    $and: [
      { booked: { $eq: false } },
      { room_number: req.body.room_number },
      { hostel_id: req.body.hostel_id },
    ],
  });
  if (myroom) {
    const booknow = new Bookings({
      hostel_id: req.body.hostel_id,
      name: req.body.name,
      telephone_number: parseInt(req.body.telephone_number),
      name_of_hostel: req.body.name_of_hostel,
      room_number: parseInt(req.body.room_number),
      email: req.body.email,
      level: req.body.level,
      user_request: true,
    });
    try {
      const save_booked_room = await booknow.save();
      res.send({
        status: true,
        result: save_booked_room,
        data: " Thanks for booking with us",
      });
    } catch (error) {
      console.log(error);
      res.send({ status: false, data: "An Error Occured", result: error });
    }
  } else {
    res.send({ data: "Room Taken already ", status: false });
  }
};

//controller for getting all bookings
const all_bookings = async (req, res) => {
  try {
    const bookings = await Bookings.findOne({
      $and: [{ booked: { $eq: false } }, { user_request: { $eq: true } }],
    });
    res.send({ status: true, result: bookings });
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};
//updating database after booking a room
const update_booked = async (req, res) => {
  try {
    const current_book = await Bookings.findById(req.params.id);
    const update_book = await Rooms.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          booked: req.body.booked || current_book.booked == true,
          user_request: req.body.user_request || current_book == false,
        },
      }
    );
    res.send({
      status: true,
      data: "room updated",
      result: update_book,
    });
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

module.exports = {
  add_hostel,
  pending_hostel,
  edit_hostel,
  one_hostel,
  confirmed_hostel,
  delete_hostel,
  all_hostel,
  add_room,
  edit_room,
  booked_rooms,
  availabe_rooms,
  delete_room,
  book_room,
  all_bookings,
  all_rooms,
  update_booked,
};
