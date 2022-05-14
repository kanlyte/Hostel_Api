const router = require("express").Router();
const { Hostel } = require("../models/task");

const add_hostel = async (req, res) => {
  console.log(req.body);
  const hostel = new Hostel({
    hostel_name: req.body.hostel_name,
    room_type: req.body.room_type,
    available_rooms: req.body.available_rooms,
    hostel_fee: req.body.hostel_fee,
    hostel_account_no: req.body.hostel_account_no,
    telphone_number: req.body.telphone_number,
    hostel_distance: req.body.hostel_distance,
    hostel_description: req.body.hostel_description,
    hostel_rules: req.body.hostel_rules,
    product_images: "",
  });
  try {
    const save_added_hostel = await hostel.save();
    res.send({
      status: true,
      data: "Hostel Added Successfully",
      result: save_added_hostel,
    });
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

module.exports = { add_hostel };
