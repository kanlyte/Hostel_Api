// const router = require("express").Router();
const { Admin }  = require('../models/task')

//the brain for registering an admin
const register_admin = async (req, res)=>{
  const admin_number = await Admin.findOne({
    telphone_number: { $eq: req.body.telphone_number },
  });
  if (admin_number) {
    res.send({ data: "phone", status: false });
    
  } else {
    const admin = new Admin({
      full_name: req.body.full_name,
      telphone_number: req.body.telphone_number,
      email: req.body.email,
      password: req.body.password,
    });
    try {
      const save_added_admin = await admin.save();
      res.send({
        status: true,
        data: "Admin registered Successfully",
        result: save_added_admin,
      });
    } catch (error) {
      res.send({ status: false, 
        data: "An Error Occured.............", 
        result: error });
    }
  }

  }

  //the brain for login of admin
  const user_login = async (req,res)=>{
    try {
      const current_admin = await Admin.findOne({
        $and: [{password: req.body.password }, { telphone_number: req.body.telphone_number}],
      });
      current_admin
        ? res.send({ user: current_admin, status: true })
        : res.send({ status: false, data: "Wrong Details" });
    } catch (error) {
      console.log(error);
      res.send({ status: false, data: "An Error Occured", result: error });
    }
  }


  module.exports = {register_admin}