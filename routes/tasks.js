const express = require('express')
const router = express.Router()
const { register_admin } = require('../controllers/admin')
const { 
    add_hostel, 
    pending_hostel, 
    edit_hostel, 
    confirmed_hostel, 
    single_hostel, 
    delete_hostel 
} = require('../controllers/hostel')
const {register_user} = require('../controllers/user')

//login routes
const registeradmin = router.post('/newadmin',register_admin)
const registeruser = router.post('/newuser', register_user)


//routes for hostels
const addhostel = router.post('/newhostel',add_hostel)
const pendinghostel = router.get('/addedhostel',pending_hostel)
const edithostel = router.put('/edithostel/:id', edit_hostel)
const confirmedhostel = router.get('/confirmedhostel',confirmed_hostel)
const singlehostel = router.get('/singlehostel/:id', single_hostel)
const deletehostel = router.get('/deletehostel/:id', delete_hostel)




module.exports = {
    addhostel, 
    registeradmin, 
    registeruser, 
    pendinghostel , 
    edithostel,
    confirmedhostel,
    singlehostel,
    deletehostel
}


