const express = require("express");
const router = express.Router();
const {
  register_admin,
  admin_login,
  new_landlord,
  edit_hostel_owner,
  all_hostel_owners,
  one_owner,
} = require("../controllers/admin");
const {
  add_hostel,
  pending_hostel,
  edit_hostel,
  confirmed_hostel,
  delete_hostel,
  all_hostel,
  all_rooms,
  one_hostel,
  add_room,
  availabe_rooms,
  booked_rooms,
  delete_room,
  edit_room,
  book_room,
  all_bookings,
  update_booked,
  delete_bookings,
  change_room_status_false,
  change_room_status_true,
  one_room,
  user_booking,
  search_hostel,
  rooms_for_landlord_one,
  rooms_for_landlord_true,
  rooms_for_landlord_false,
  rooms_for_landlord,
  delete_book,
  reverse,
  change,
} = require("../controllers/hostel");
const {
  owner_login,
  owner_hostels,
  landlord_rooms,
  landlord_request,
  all_landlord_requests,
} = require("../controllers/landlord");
const {
  register_user,
  user_login,
  delete_user,
  update_user,
  all_users,
  one_user,
  newsletter,
  reviews,
  contactus,
  all_contact,
  hostel_reviews,
  all_reviews,
} = require("../controllers/user");

//admin  routes
const registeradmin = router.post("/newadmin", register_admin);
const loginadmin = router.post("/loginadmin", admin_login);

//landlord / hostel owner routes
const newlandlord = router.post("/newlandlord", new_landlord);
const deleteOwner = router.delete("/deleteowner", delete_hostel);
const resetOwner = router.put("/resetowner/:id", edit_hostel_owner);
const allOwners = router.get("/allowners", all_hostel_owners);
const oneOwner = router.get("/owner/one/:id", one_owner);
const landlordrequest = router.post("/request/landlord", landlord_request);
const alllandlordrequest = router.get(
  "/alllandlordrequests",
  all_landlord_requests
);

// user routes
const registeruser = router.post("/newuser", register_user);
const userlogin = router.post("/login", user_login);
const deleteuser = router.delete("/user/delete/:id", delete_user);
const updateuser = router.put("/user/:id", update_user);
const allusers = router.get("/users", all_users);
const oneuser = router.get("/user/one/:id", one_user);

//hostel owner login
const ownerlogin = router.post("/hostelowner", owner_login);
const ownerhostels = router.get("/hostels/:id", owner_hostels);
const landlordrooms = router.get("/rooms/:id", landlord_rooms);

//routes for hostels
const addhostel = router.post("/newhostel", add_hostel);
const pendinghostel = router.get("/pendinghostel", pending_hostel);
const edithostel = router.put("/edit/:id", edit_hostel);
const confirmedhostel = router.get("/confirmedhostel", confirmed_hostel);
const deletehostel = router.delete("/deletehostel/:id", delete_hostel);
const onehostel = router.get("/hostel/:id", one_hostel);
const allhostel = router.get("/allhostels", all_hostel);
const searchhostel = router.get("/hostel/search/:key", search_hostel);

//routes for rooms
const addroom = router.post("/addroom", add_room);
const allrooms = router.get("/allrooms", all_rooms);
const availaberooms = router.get("/availablerooms", availabe_rooms);
const bookedrooms = router.get("/bookedrooms", booked_rooms);
const deleteroom = router.delete("/deleteroom/:id", delete_room);
const editroom = router.put("/editroom/:id", edit_room);
const oneroom = router.get("/room/one/:id", one_room);
const statusfalse = router.put("/room/false/:id", change_room_status_false);
const statustrue = router.put("/room/true/:id", change_room_status_true);
const roomsforlandlord = router.get(
  "/rooms/landlord/:landlord_id",
  rooms_for_landlord
);
const roomsforlandlordtrue = router.get(
  "/rooms/landlord/true/:landlord_id",
  rooms_for_landlord_true
);
const roomsforlandlordfalse = router.get(
  "/rooms/landlord/false/:landlord_id",
  rooms_for_landlord_false
);

//routes for newsletter
const newslettersubscription = router.post("/new/subscriber", newsletter);

//routes for bookings
const addbooking = router.post("/book", book_room);
const getbookings = router.get("/allbookings", all_bookings);
const updatebooked = router.put("/booked/:id", update_booked);
const deleteallbookings = router.delete("/deletebookings", delete_bookings);
const userbooking = router.get("/booking/user/:user_id", user_booking);
const deletebook = router.delete("/delete/book/:id", delete_book);
const reversebook = router.put("/reverse/false/:id", reverse);
const changebook = router.put("/change/true/:id", change);
// const landlordbooking = router.get(
//   "/booking/landlord/:landlord_id",
//   user_booking
// );

// reviews
const newreviews = router.post("/new/review", reviews);
const allreviews = router.get("/allreviews", all_reviews);
const hostelreviews = router.get("/reviews/hostel/:id", hostel_reviews);

// contact us
const contact_us = router.post("/new/contact", contactus);
const allcontactus = router.get("/allcontactus", all_contact);

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
  allrooms,
  ownerhostels,
  addroom,
  availaberooms,
  bookedrooms,
  deleteroom,
  editroom,
  addbooking,
  landlordrooms,
  getbookings,
  updatebooked,
  deleteallbookings,
  deleteuser,
  allusers,
  updateuser,
  oneroom,
  statusfalse,
  statustrue,
  userbooking,
  searchhostel,
  landlordrequest,
  alllandlordrequest,
  roomsforlandlord,
  roomsforlandlordtrue,
  roomsforlandlordfalse,
  oneOwner,
  newslettersubscription,
  reversebook,
  changebook,
  deletebook,
  allreviews,
  newreviews,
  contact_us,
  allcontactus,
  hostelreviews,
};
