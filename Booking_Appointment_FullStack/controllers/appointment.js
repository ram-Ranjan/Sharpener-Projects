const Appointment = require('../models/appointment');

exports.postAppointment = (req, res, next) => {
    const { username, email, phone } = req.body;
    
    Appointment.create({
        username: username,
        email: email,
        phone: phone
    })
    .then(appointment => {
        console.log('Appointment Created');
        res.status(201).json(appointment);
    })
    .catch(err => res.status(500).json({ error: err.message }));
}

exports.getAllAppointments = (req, res) => {
    Appointment.findAll()
    .then(appointments => {
        res.status(200).json(appointments);
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    })
};

exports.putAppointment = (req, res, next) => {
    const appointId = req.params.id; // Changed from appointId to id to match route
    Appointment.findByPk(appointId)
    .then(appointment => {
        if(appointment){
            return appointment.update(req.body);
        }
        throw new Error('Appointment not found');
    })
    .then(updatedAppointment => {
        res.status(200).json(updatedAppointment)
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
}

exports.deleteAppointment = (req, res, next) => {
    const appointId = req.params.id; // Changed from appointId to id to match route
    Appointment.findByPk(appointId)
    .then(appointment => {
        if(appointment){
            return appointment.destroy();
        }
        throw new Error('Appointment not found');
    })
    .then(() => {
        res.status(204).send();
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
}