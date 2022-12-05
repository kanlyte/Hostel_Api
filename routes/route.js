const express = require("express");
const router = express.Router();
const {
  register_admin,
  admin_login,
  new_landlord,
  edit_hostel_owner,
  all_hostel_owners,
} = require("../controllers/admin");
const {
  add_hostel,
  pending_hostel,
  edit_hostel,
  confirmed_hostel,
  delete_hostel,
  all_hostel,
  one_hostel,
  add_room,
  availabe_rooms,
  booked_rooms,
  delete_room,
  edit_room,
  book_room,
  all_bookings,
  all_rooms,
  update_booked,
} = require("../controllers/hostel");
const { owner_login, owner_hostels } = require("../controllers/landlord");
const { register_user, user_login } = require("../controllers/user");

//admin  routes
const registeradmin = router.post("/newadmin", register_admin);
const loginadmin = router.post("/loginadmin", admin_login);
const newlandlord = router.post("/newlandlord", new_landlord);
const deleteOwner = router.delete("/deleteowner", delete_hostel);
const resetOwner = router.post("/resetowmer", edit_hostel_owner);
const allOwners = router.get("/allOwners", all_hostel_owners);

// user routes
const registeruser = router.post("/newuser", register_user);
const userlogin = router.post("/user", user_login);

//hostel owner login
const ownerlogin = router.post("/hostelowner", owner_login);
const ownerhostels = router.get("/hostels/:id", owner_hostels);

//routes for hostels
const addhostel = router.post("/newhostel", add_hostel);
const pendinghostel = router.get("/pendinghostel", pending_hostel);
const edithostel = router.put("/edit/:id", edit_hostel);
const confirmedhostel = router.get("/confirmedhostel", confirmed_hostel);
const deletehostel = router.delete("/deletehostel/:id", delete_hostel);
const onehostel = router.get("/onehostel/:id", one_hostel);
const allhostel = router.get("/allhostels", all_hostel);

//routes for rooms
const addroom = router.post("/addroom", add_room);
const allrooms = router.get("/allrooms", all_rooms);
const availaberooms = router.get("/availablerooms", availabe_rooms);
const bookedrooms = router.get("/bookedrooms", booked_rooms);
const deleteroom = router.delete("/deleteroom/:id", delete_room);
const editroom = router.put("/editroom:/id", edit_room);

//routes for bookings
const addbooking = router.post("/book", book_room);
const getbookings = router.get("/allbookings", all_bookings);
const updatebooked = router.put("/booked/:id", update_booked);

module.exports = {
  addhostel,
  registeradmin,
  registeruser,
  pendinghostel,
  edithostel,
  confirmedhostel,
  deletehostel,
  loginadmin,
  newlandlord,
  userlogin,
  ownerlogin,
  deleteOwner,
  onehostel,
  resetOwner,
  allOwners,
  allhostel,
  ownerhostels,
  addroom,
  availaberooms,
  bookedrooms,
  deleteroom,
  editroom,
  addbooking,
  getbookings,
  allrooms,
  updatebooked,
};

// "result": [
//   {
//       "hostel_id": "635ece58c52f478f1d7cc539",
//       "room_type": "Single",
//       "room_number": "7",
//       "room_fee": "350000",
//       "booked": false,
//       "hostel_landlord": "634a9e1ea081360018fd294c",
//       "date": "2022-11-09T06:20:04.825Z",
//       "id": "636b4694ad2de8766a81e722"
//   },
//   {
//       "hostel_id": "635ece58c52f478f1d7cc539",
//       "room_type": "Double",
//       "room_number": "33",
//       "room_fee": "4300000",
//       "booked": false,
//       "hostel_landlord": "634a9e1ea081360018fd294c",
//       "date": "2022-11-09T06:21:28.064Z",
//       "id": "636b46e8ad2de8766a81e726"
//   },
//   {
//       "hostel_id": "635ece58c52f478f1d7cc539",
//       "room_type": "Single",
//       "room_number": "3",
//       "room_fee": "300000",
//       "booked": false,
//       "hostel_landlord": "634a9e1ea081360018fd294c",
//       "date": "2022-11-09T06:21:45.105Z",
//       "id": "636b46f9ad2de8766a81e72a"
//   }

// {
//     "hostel_id":"635ece58c52f478f1d7cc539",
//     "name":"Gaston",
//     "telephone_number":"089586",
//     "room_number":"33",
//     "email":"g@gmail.com",
//     "level":"Undergraduate"
// }
