const Appointment = require('../models/appointment');
const path = require('path')
const fs = require('fs')
const sequelize = require('../util/db')




exports.postAppointment =(req,res,next) => {

    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;

    Appointment.create({
        userName:userName,
        email:email,
        password:password
    })
    .then(appointment => {
        console.log('Appointment Created');
        res.status(201).json(appointment);
    })
    .catch(err => res.status(500).json({ error: error.message }));
    
}

exports.getAllAppointments =  (req, res) => {
    Appointment.findAll()
    .then(appointments => {
        res.status(200).json(appointments);
    })
     .catch(error => {
      res.status(500).json({ error: error.message });
    })
  };

exports.putAppointment = (req,res,next) => {
    const appointId = req.params.appointId;
    Appointment.findByPk(appointId)
    .then(appointment => {
        if(appointment){
            appointment.update(req.body);
            res.status(200).json(appointment)
        }
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
      });
}

exports.deleteAppointment = (req,res,next) => {
    const appointId = req.params.appointId;
    Appointment.findByPk(appointId)
    .then(appointment => {
        if(appointment){
            appointment.destroy();
            res.status(204).json()
        }
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
      });
}


// module.exports = sequelize;

