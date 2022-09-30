const { HostelOwner } = require("../models/model");

// registering of a hostel owner is done by an admin

/* A hostel owner has two roles ie viewing
     bookings for his / her particular hostel
    and Managing the hostel. The route for managing 
    hostel is already made in the admin routes
    
    we shall look into pulling of data of the 
    hostel to align it with the hostel owner

    Reseting password is needed here and authentication 
    any one with an idea can add it.
    */

//the brain for login of a hostel owner
const owner_login = async (req, res) => {
  try {
    const current_owner = await HostelOwner.find({
      $and: [{ password: req.body.password }, { email: req.body.email }],
    });
    if (current_owner) {
      res.send({ user: current_owner, status: true });
    } else {
      res.send({ status: false, data: "No matching details" });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

module.exports = { owner_login };
