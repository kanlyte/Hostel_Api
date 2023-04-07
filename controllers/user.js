// const router = require("express").Router();
const { Users, NewsLetter, Reviews, Contact } = require("../models/model");

/*
  Users have three routes:
  1: registering
  2: Loging in 
  3:Booking form


  // booking form route shall be looked at in the future after future discussions
*/

// the brain for registering a new user(student)

const register_user = async (req, res) => {
  const email_check = await Users.findOne({
    email: { $eq: req.body.email },
  });
  if (email_check) {
    res.send({ data: "Emailtaken", status: false });
  } else {
    const user = new Users({
      full_name: req.body.full_name,
      phone_number: parseInt(req.body.phone_number),
      email: req.body.email,
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
      res.send({ status: false, data: "An Error Occured", result: error });
    }
  }
};

//user login
const user_login = async (req, res) => {
  try {
    const current_user = await Users.findOne({
      $and: [{ password: req.body.password }, { email: req.body.email }],
    });
    current_user
      ? res.send({ user: current_user, status: true })
      : res.send({ status: false, data: "Wrong Details" });
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

// route for editing user information
const update_user = async (req, res) => {
  try {
    const current_user = await Users.findById(req.params.id);
    const edit_user = await Users.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          full_name: req.body.full_name || current_user.full_name,
          phone_number: req.body.phone_number || current_user.phone_number,
          email: req.body.email || current_user.email,
          password: req.body.password || current_user.password,
        },
      }
    );
    res.send({
      status: true,
      data: "user profile updated",
      result: edit_user,
    });
  } catch (error) {
    res.send({
      status: false,
      data: "Update failed",
    });
  }
};

//route for deleting users profile
const delete_user = async (req, res) => {
  try {
    const current_user = await Users.findById(req.params.id);
    if (current_user) {
      const remove_user = await Users.deleteOne({
        _id: req.params.id,
      });
      res.send({
        status: true,
        data: "Account Deleted",
        result: remove_user,
      });
    } else {
      res.send({
        status: false,
        data: "User not Found",
      });
    }
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

//route for displaying all user
const all_users = async (req, res) => {
  try {
    const users = await Users.find();
    res.send({
      status: true,
      result: users,
      data: "All users available",
    });
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

//getting one user
const one_user = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    res.send({
      status: true,
      result: user,
      data: "My user",
    });
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

// newsletter post router
const newsletter = async (req, res) => {
  try {
    const email_check = await NewsLetter.findOne({
      email: { $eq: req.body.email },
    });
    if (email_check) {
      res.send({
        data: "Already subscribed to our news letter",
        status: false,
      });
    } else {
      const newSubscriber = new NewsLetter({
        email: req.body.email,
      });
      const save_new = await newSubscriber.save();
      res.send({
        status: true,
        data: "subscribed",
        result: save_new,
      });
    }
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

// posting reviews,
const reviews = async (req, res) => {
  try {
    const newreview = new Reviews({
      review: req.body.review,
      name: req.body.review,
      email: req.body.email,
      hostel_id: req.body.hostel_id,
    });
    const save_review = await newreview.save();
    res.send({
      status: true,
      data: "sent",
      result: save_review,
    });
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

//getting all reviews
const all_reviews = async (req, res) => {
  try {
    const reviews = await Reviews.find();
    res.send({
      status: true,
      result: reviews,
      data: "reviews",
    });
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};
//getting reviews by hostel id

const hostel_reviews = async (req, res) => {
  try {
    const reviews = await Reviews.find({ hostel_id: req.params.hostel_id });
    res.send({
      status: true,
      result: reviews,
      data: "reviews",
    });
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};
// post contact us
const contactus = async (req, res) => {
  try {
    const newcontactus = new Contact({
      name: req.body.review,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
    });

    const save_contact = await newcontactus.save();
    res.send({
      status: true,
      data: "sent",
      result: save_contact,
    });
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

//getting all contact us messages
const all_contact = async (req, res) => {
  try {
    const contact = await Contact.find();
    res.send({
      status: true,
      result: contact,
      data: "contact",
    });
  } catch (error) {
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

module.exports = {
  register_user,
  user_login,
  delete_user,
  update_user,
  all_users,
  one_user,
  newsletter,
  reviews,
  all_reviews,
  all_contact,
  contactus,
  hostel_reviews,
};
