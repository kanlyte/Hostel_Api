const mongoose = require("mongoose");

const id = (schema) => {
  schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      delete ret._id;
    },
  });
};

//model for entering a new hostel
const HostelSchema = new mongoose.Schema({
  hostel_name: {
    type: String,
  },
  hostel_distance: {
    type: String,
  },
  hostel_description: {
    type: String,
  },
  single_room_amount: {
    type: Number,
  },
  double_room_amount: {
    type: Number,
  },
  telphone_number: {
    type: Number,
  },
  single_rooms_available: {
    type: String,
  },
  double_rooms_available: {
    type: String,
  },
  booking_fee: {
    type: String,
  },
  hostel_account_no: {
    type: Number,
  },
  hostel_owner: {
    type: String,
  },
  hostel_images: {
    type: String,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  hostel_date: {
    type: Date,
    default: Date.now,
  },
});
id(HostelSchema);

const Hostel = new mongoose.model("hostels", HostelSchema);

//model for registering a new user(student)
const registerUserSchema = new mongoose.Schema({
  full_name: {
    type: String,
  },
  phone_number: {
    type: Number,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  confirm_password: {
    type: String,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
});

id(registerUserSchema);

const Users = new mongoose.model("users", registerUserSchema);

//model for registering a new admin
const registeradminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [5, "Minimum password lenth is 5"],
  },
});

id(registeradminSchema);
const Admin = new mongoose.model("admins", registeradminSchema);

//model for registering a new hostel owner
const registerHostelOwnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  hostel: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [10, "Minimum password lenth is 5"],
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
});

id(registerHostelOwnerSchema);
const HostelOwner = new mongoose.model(
  "hostel_owner",
  registerHostelOwnerSchema
);

module.exports = { Hostel, Users, Admin, HostelOwner };
