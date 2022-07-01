const router = require("express").Router();
const { Hostel, UsersRegistered, Admin,  } = require("../models/task");

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

// the brain for registering a new user(student)
const register_user = async (req, res)=>{
  const user = new UsersRegistered({
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

//the brain for login of the user // not yet complete
const login_user = async (req, res)=>{
  const login_user = new UsersRegistered({
    phone_number: req.body.phone_number,
    password: req.body.password,
  });
  try {
    const save_logged_user = await login_user.save();
    res.send({
      status: true,
      data: "login is Successfull",
      result: save_logged_user,
    });
  } catch (error) {
    res.send({ status: false, 
      data: "An Error Occured", 
      result: error });
  }
}

//the brain for registering an admin
const register_admin = async (req, res)=>{
  const admin = new Admin({
    full_name: req.body.full_name,
    telphone_number: req.body.telphone_number,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const save_added_admin = await user.save();
    res.send({
      status: true,
      data: "registered Successfully",
      result: save_added_admin,
    });
  } catch (error) {
    res.send({ status: false, 
      data: "An Error Occured", 
      result: error });
  }
}
//the brain for login of the admin  // notyet complete
const login_admin = async (req, res)=>{
  const login_admin = new adminloggedIn({
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const save_logged_admn = await login_admin.save();
    res.send({
      status: true,
      data: "login is Successfull",
      result: save_logged_admn,
    });
  } catch (error) {
    res.send({ status: false, 
      data: "An Error Occured", 
      result: error });
  }
}



// module.exports = { add_hostel, register_user, login_user, register_admin, login_admin};
