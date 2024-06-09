
const Sequelize = require('sequelize');
const sequelize = require('../util/db');

 const Appointment = sequelize.define('appointment',{

    //  id:{
    //      type:Sequelize.INTEGER,
    //      autoIncremwnt:true,
    //      allowNull:false,
    //      primaryKey:true
    //  },
     username:{
         type:Sequelize.STRING,
         allowNull:false
     },
     email:{
        type:Sequelize.STRING,
        allowNull:false
     },
     phone:{
        type:Sequelize.BIGINT(10),
        allowNull:false
     }
 });

 module.exports=Appointment;