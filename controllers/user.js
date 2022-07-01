// const router = require("express").Router();
const { Users }  = require('../models/task')

// the brain for registering a new user(student)

  
const register_user = async (req, res)=>{
  const email_check = await Users.findOne({
    university_email: { $eq: req.body.university_email },
  });
  if (email_check) {
    res.send({ data: "university_email", status: false });
    
  } else {
    const user = new Users({
      full_name: req.body.full_name,
      phone_number: req.body.phone_number,
      university_email: req.body.university_email,
      department: req.body.department,
      password: req.body.password,
    });
    try {
      const save_added_user = await user.save();
      res.send({
        status: true,
        data: "user registered Successfully",
        result: save_added_user,
      });
    } catch (error) {
      res.send({ status: false, 
        data: "An Error Occured", 
        result: error });
    }
  }

  }

  module.exports = {register_user}