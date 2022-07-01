const mongoose = require('mongoose')

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
const newHostelSchema= new mongoose.Schema({
hostel_name:{
    type: String,
},
room_type:{
    type: String,
},
available_rooms:{
    type: String,
},
hostel_fee:{
    type: Number,
},
hostel_account_no:{
    type: Number,
},
telphone_number:{
    type: Number,
},
hostel_distance:{
    type: String,
},
hostel_description:{
    type: String,
},
hostel_rules:{
    type: String,
},
hostel_images:{
    type: String,
},
 confirmed: {
    type: Boolean,
    default: false
  },
  product_date: {
    type: Date,
    default: Date.now,
  }
})

id(newHostelSchema)

const Hostel = new mongoose.model("hostels", newHostelSchema);

//model for registering a new user(student)
const registerUserSchema = new mongoose.Schema({
    full_name:{
        type:String
    },
    phone_number:{
        type:Number
    },
    university_email:{
        type:String
    },
    department:{
        type:String
    },
    password:{
        type:String
    },
    confirm_password:{
        type:String
    }
})

id(registerUserSchema)

const Users = new mongoose.model("users", registerUserSchema)

//model for registering a new admin
const registeradminSchema = new mongoose.Schema({
    full_name:{
        type:String
    },
    phone_number:{
        type:Number
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    confirm_password:{
        type:String
    }
})

id(registeradminSchema)
const Admin = new mongoose.model("admins", registeradminSchema)


module.exports = {Hostel, Users , Admin}