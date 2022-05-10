const mongoose = require('mongoose')

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

// id(newHostelSchema)

const Hostel = new mongoose.model("hostels", newHostelSchema);


module.exports = {Hostel}