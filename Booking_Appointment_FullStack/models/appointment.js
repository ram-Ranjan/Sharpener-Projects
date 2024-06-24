const Sequelize = require('sequelize');
const sequelize = require('../util/db');

const Appointment = sequelize.define('appointment', {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Appointment;