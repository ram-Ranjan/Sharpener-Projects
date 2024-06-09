
const Sequelize = require('sequelize')

const sequelize = new Sequelize('booking_fullstack','root','root@321',
{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports=sequelize;