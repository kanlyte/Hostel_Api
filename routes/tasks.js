const express = require('express')
const router = express.Router()

const {add_hostel} = require('../controllers/task')
// console.log(add_hostel)


router.post('/new',add_hostel)


module.exports = router