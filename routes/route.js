const express = require("express");
const router = express.Router();
const {
  register_admin,
  admin_login,
  register_hostel_owner,
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
} = require("../controllers/hostel");
const { owner_login } = require("../controllers/hostelOwner");
const { register_user, user_login } = require("../controllers/user");

//admin  routes
const registeradmin = router.post("/newadmin", register_admin);
const loginadmin = router.post("/loginadmin", admin_login);
const registerhostelowner = router.post(
  "/registerhostelowner",
  register_hostel_owner
);
const deleteOwner = router.delete("/deleteowner", delete_hostel);
const resetOwner = router.post("/resetowmer", edit_hostel_owner);
const allOwners = router.get("/allOwners", all_hostel_owners);

// user routes
const registeruser = router.post("/newuser", register_user);
const userlogin = router.post("/user", user_login);

//hostel owner login
const ownerlogin = router.post("/hostelowner", owner_login);

//routes for hostels
const addhostel = router.post("/newhostel", add_hostel);
const pendinghostel = router.get("/pendinghostel", pending_hostel);
const edithostel = router.put("/edit/:id", edit_hostel);
const confirmedhostel = router.get("/confirmedhostel", confirmed_hostel);
const deletehostel = router.delete("/deletehostel/:id", delete_hostel);
const onehostel = router.get("/onehostel/:id", one_hostel);
const allhostel = router.get("/allhostel", all_hostel);

module.exports = {
  addhostel,
  registeradmin,
  registeruser,
  pendinghostel,
  edithostel,
  confirmedhostel,
  deletehostel,
  loginadmin,
  registerhostelowner,
  userlogin,
  ownerlogin,
  deleteOwner,
  onehostel,
  resetOwner,
  allOwners,
  allhostel,
};
