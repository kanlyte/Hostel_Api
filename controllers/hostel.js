const { Hostel, LandLord, Rooms, Bookings } = require("../models/model");
const router = require("express").Router();
const nodemailer = require("nodemailer");

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
/*
Here, this route route shall help, us in 
searching for hostels basing on hostel name 
in the future we shall need to enable seaching
 using different fields otherthan user name 
 eg prices, location and others to ease searching 
 by users.

*/

const search_hostel = async (req, res) => {
  try {
    const search = await Hostel.find({
      $or: [{ hostel_name: { $regex: req.params.key } }],
    });
    res.send({
      status: true,
      data: "your searches",
      result: search,
    });
  } catch (error) {
    res.send({
      data: "error",
      result: error,
    });
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
  console.log(req.body);
  if (!myroom) {
    const room = new Rooms({
      hostel_id: req.body.hostel_id,
      hostel_name: req.body.hostel_name,
      room_type: req.body.room_type,
      room_number: parseInt(req.body.room_number),
      room_fee: parseInt(req.body.room_fee),
      room_description: req.body.room_description,
      booked: false,
      landlord_id: req.body.landlord_id,
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

/*

controller for converting booked false to true.
 This shall help incase a user doesn't use the system to book the room
 but instead gets a room manually. The manager will update the system through triggering this function.

*/
//changes status to true
const change_room_status_true = async (req, res) => {
  try {
    await Rooms.findById(req.params.id);
    const room = await Rooms.updateOne(
      { _id: req.params.id },
      { $set: { booked: true } }
    );

    res.send({
      status: true,
      data: "status updated",
      result: room,
    });
  } catch (error) {
    res.send({
      data: "Error occured",
      status: false,
      result: error,
    });
  }
};
//changes status to false
const change_room_status_false = async (req, res) => {
  try {
    await Rooms.findById(req.params.id);
    const room = await Rooms.updateOne(
      { _id: req.params.id },
      { $set: { booked: false } }
    );

    res.send({
      status: true,
      data: "status updated",
      result: room,
    });
  } catch (error) {
    res.send({
      data: "Error occured",
      status: false,
      result: error,
    });
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
          room_description:
            req.body.room_description || current_room.room_description,
          room_number:
            parseInt(req.body.room_number) || current_room.room_number,
          room_fee: parseInt(req.body.room_fee) || current_room.room_fee,
          confirmed: true,

          // hostel images need to be acted upon
          // room_image: req.body.room_image
          //   ? JSON.stringify(req.body.room_image)
          //   : current_image.room_image,
        },
      }
    );
    res.send({
      status: true,
      data: "room updated",
      result: updated_room,
    });
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

//gets all rooms
const all_rooms = async (req, res) => {
  try {
    const rooms = await Rooms.find();
    res.send({ status: true, result: rooms });
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

//getting one room
const one_room = async (req, res) => {
  try {
    const room = await Rooms.findById(req.params.id);
    res.send({
      status: true,
      result: room,
      data: "My room",
    });
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};
//getting rooms by landlord id given they are not booked
const rooms_for_landlord = async (req, res) => {
  try {
    const rooms = await Rooms.find({
      landlord_id: req.params.landlord_id,
    });
    if (!rooms) {
      res.send({
        status: false,
        data: "No rooms for this landlord",
      });
    } else {
      res.send({
        status: true,
        data: "awurew",
        result: rooms,
      });
    }
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
    console.log(error);
  }
};
//getting rooms by landlord id given they are not booked
// const rooms_for_landlord_false = async (req, res) => {
//   try {
//     const bookedfalse = await Rooms.find({
//       booked: { $eq: false },
//     });
//     if (bookedfalse) {
//       const rooms = await Rooms.find({
//         landlord_id: req.params.landlord_id,
//       });
//       if (!rooms) {
//         res.send({
//           status: false,
//           data: "No rooms for this landlord",
//         });
//       } else {
//         res.send(rooms);
//       }
//     } else {
//       res.send({ status: false, data: "No ", result: error });
//     }
//   } catch (error) {
//     res.send({ status: false, data: "An Error Occured", result: error });
//     console.log(error);
//   }
// };
//getting rooms by landlord id given they are  false
const rooms_for_landlord_false = async (req, res) => {
  try {
    const bookedfalse = await Rooms.find({
      booked: { $eq: false },
    });

    if (bookedfalse) {
      res.send(bookedfalse);
    } else {
      res.send({ status: false, data: "An Error Occured", result: error });
    }
  } catch (error) {
    res.send({ status: false, data: "An Erroedr Occured", result: error });
    console.log(error);
  }
};
//getting rooms by landlord id given they are  booked
const rooms_for_landlord_true = async (req, res) => {
  try {
    const bookedtrue = await Rooms.find({
      booked: { $eq: true },
    });

    if (bookedtrue) {
      res.send(bookedtrue);
    } else {
      res.send({ status: false, data: "An Error Occured", result: error });
    }
  } catch (error) {
    res.send({ status: false, data: "An Erroedr Occured", result: error });
    console.log(error);
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
        status: false,
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
      { room_id: req.body.room_id },
      { hostel_id: req.body.hostel_id },
    ],
  });
  console.log(req.body);
  // console.log(myroom);

  if (myroom) {
    const booknow = new Bookings({
      hostel_id: req.body.hostel_id,
      landlord_id: req.body.landlord_id,
      room_id: req.body.room_id,
      user_id: req.body.user_id,
      name: req.body.name,
      telephone_number: parseInt(req.body.telephone_number),
      name_of_hostel: req.body.name_of_hostel,
      room_number: parseInt(req.body.room_number),
      email: req.body.email,
      level: req.body.level,
      booking_fee: req.body.booking_fee,
      type_of_entry: req.body.type_of_entry,
      location: req.body.location,
      payment_code: req.body.payment_code,
      user_request: true,
      book_status: false, // meaning pending status
    });

    // console.log(Rooms.room_number);

    try {
      const save_booked_room = await booknow.save();

      const room = await Rooms.find();
      const now = await room.filter((broom) => {
        return broom.id == save_booked_room.room_id;
      });
      const gast = await Rooms.updateOne(
        { _id: save_booked_room.room_id },
        { $set: { booked: true } }
      );

      //sending a message using node mailer.

      //node mailer trial one

      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "beaconhostels@gmail.com",
          pass: "wttdwlapdndotjtm",
          // pass: "xwvubhomgmnangje",
        },
      });

      let details = {
        from: "beaconhostels@gmail.com",
        to: save_booked_room.email,
        // to: "aggipeter25@gmail.com",
        subject: "Beacon hostels Team.",
        text: `Hello:${save_booked_room.name} 
         We notice that you have booked a room with Beacon Hostels .
         The following are the details of the room that you have booked.
         Hostel name : ${save_booked_room.name_of_hostel} 
         Room number: ${save_booked_room.room_number} 
         More information about the room booked is displayed in your user accout.
         Our beacon hostels team shall call you to keep you on track of your bookings. 
         Thanks for booking with us.
         Download our lyte app from google playstore for more about our services.
         `,
      };
      mailTransporter.sendMail(details, (err) => {
        if (err) {
          console.log("got an error");
        } else {
          // res.send(details);
          console.log("you got it right.");
        }
      });

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
    const bookings = await Bookings.find({
      user_request: { $eq: true },
    });
    res.send({ status: true, result: bookings });
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

//geting booking by id of the user

const user_booking = async (req, res) => {
  try {
    const booking = await Bookings.find({ user_id: req.params.user_id });
    if (!booking) {
      res.send({ status: false, data: "No rooms ", result: error });
    } else {
      res.send({
        status: true,
        result: booking,
        data: "My bookings",
      });
    }
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

//geting booking by id of the lanlord

const landlord_booking = async (req, res) => {
  try {
    const booking = await Bookings.find({
      landlord_id: req.params.landlord_id,
    });
    if (!booking) {
      res.send({ status: false, data: "No rooms ", result: error });
    } else {
      res.send({
        status: true,
        result: booking,
        data: "My bookings",
      });
    }
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

//deleting all bookings at once
// this api is specifically for backend use..... do not render it in the front end
// because it is more harmful to the data

const delete_bookings = async (req, res) => {
  try {
    const all = await Bookings.find({ user_request: { $eq: true } });
    if (all) {
      const deleteall = await Bookings.deleteMany({ user_request: true });
      res.send({
        status: true,
        data: "deleted",
        result: deleteall,
      });
    } else {
      res.send({
        status: false,
        data: "Room not Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

// delete booking by booking id
const delete_book = async (req, res) => {
  try {
    const one = await Bookings.findById(req.params.id);
    if (one) {
      const delete_one = await Bookings.deleteOne({ _id: req.params.id });
      res.send({
        status: true,
        data: "delete",
        result: delete_one,
      });
    } else {
      res.send({
        status: true,
        data: "hostel not Found",
      });
    }
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

//changing status from false to true
const change = async (req, res) => {
  try {
    await Bookings.findById(req.params.id);
    const book = await Bookings.updateOne(
      { _id: req.params.id },
      { $set: { book_status: true } }
    );
    res.send({
      status: true,
      data: "status updated",
      result: book,
    });
  } catch (error) {
    res.send({
      data: "Error occured",
      status: false,
      result: error,
    });
  }
};
//changing status from  true to false
const reverse = async (req, res) => {
  try {
    await Bookings.findById(req.params.id);
    const book = await Bookings.updateOne(
      { _id: req.params.id },
      { $set: { book_status: false } }
    );
    res.send({
      status: true,
      data: "status updated",
      result: book,
    });
  } catch (error) {
    res.send({
      data: "Error occured",
      status: false,
      result: error,
    });
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
  all_rooms,
  add_room,
  edit_room,
  booked_rooms,
  availabe_rooms,
  delete_room,
  book_room,
  all_bookings,
  update_booked,
  delete_bookings,
  one_room,
  change_room_status_false,
  change_room_status_true,
  user_booking,
  search_hostel,
  rooms_for_landlord_true,
  landlord_booking,
  rooms_for_landlord_false,
  rooms_for_landlord,
  reverse,
  delete_book,
  change,
};
