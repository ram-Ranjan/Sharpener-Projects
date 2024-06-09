
const express = require('express')
const router = express.Router();
const path = require('path')

const adminController = require('../controllers/appointment')


router.get('/',adminController.getAllAppointments)

router.post('/',adminController.postAppointment)

router.put('/:id', adminController.putAppointment);

router.delete('/:id', adminController.deleteAppointment);

module.exports = router;