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
  single_hostel,
  delete_hostel,
  all_hostels,
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
const allOwners = router.post("/allOwners", all_hostel_owners);

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
const singlehostel = router.get("/:id", single_hostel);
const allhostels = router.get("/all", all_hostels);
const deletehostel = router.delete("/deletehostel/:id", delete_hostel);



module.exports = {
  addhostel,
  registeradmin,
  registeruser,
  pendinghostel,
  edithostel,
  confirmedhostel,
  singlehostel,
  deletehostel,
  loginadmin,
  registerhostelowner,
  userlogin,
  ownerlogin,
  deleteOwner,
  resetOwner,
  allOwners,
  allhostels,
};
