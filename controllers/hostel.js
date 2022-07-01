const router = require("express").Router();
const { Hostel }  = require('../models/task')

//the brain for adding a new hostel
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
        confirmed: false,
  });
  try {
        const save_added_hostel = await hostel.save();
        res.redirect('http://localhost:5002/');
  } catch (error) {
        console.log(error);
        res.send({ status: false, data: "An Error Occured", result: error });
  }
};


//gets pending hostels for display
const pending_hostel = async (req, res)=>{
  try {
        const pending_hostel = await Hostel.find({ confirmed: { $eq: false } });
        res.send({ status: true, result: pending_hostel });
  } catch (error) {
        console.log(error);
        res.send({ status: false, data: "An Error Occured", result: error });
  }
  }

  //editing pending hostels
const edit_hostel = async (req , res) =>{
  try {
        const current_hostel = await Hostel.findById(req.params.id);
        const updated_hostel = await Hostel.updateOne({
          _id: req.params.id,
        },
        {
          $set:{
            hostel_name:req.body.hostel_name || current_hostel.hostel_name,
            room_type: req.body.room_type || current_hostel.room_type,
            available_rooms: req.body.available_rooms || current_hostel.available_rooms,
            hostel_fee: req.body.hostel_fee || current_hostel.hostel_fee,
            hostel_account_no: req.body.hostel_account_no || current_hostel.hostel_account_no,
            telphone_number: req.body.telphone_number || current_hostel.telphone_number,
            hostel_distance: req.body.hostel_distance || current_hostel.hostel_distance,
            hostel_description: req.body.hostel_description || current_hostel.hostel_description,
            hostel_rules: req.body.hostel_rules || current_hostel.hostel_rules,
            confirmed: req.body.confirmed || current_hostel.confirmed,
          },
        });
        res.send({
          status: true,
          data: "hostel edited Successfully",
          result: updated_hostel,
        })
  } catch (error) {
        console.log(error);
        res.send({ status: false, data: "An Error Occured", result: error });
  }
}
  
//gets confirmed hostels

const confirmed_hostel = async (req, res)=>{
  try {
    const confirmed_hostel = await Hostel.find({ confirmed: { $eq: true } });
    res.send({ status: true, result: confirmed_hostel });
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "An Error Occured", result: error });
  }
  }

  //gets single product basing on the id
  const single_hostel = async (req, res)=>{
    try {
      const single_hostel = await Hostel.findById(req.params.id);
      res.send({ status: true, result: single_hostel });
    } catch (error) {
      console.log(error);
      res.send({ status: false, data: "An Error Occured", result: error });
    }
  }

  //delets a given product by id 
const delete_hostel = async (req, res)=>{
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
}


module.exports = {
  add_hostel, 
  pending_hostel,
  edit_hostel,
  confirmed_hostel,
  single_hostel,
  delete_hostel
}