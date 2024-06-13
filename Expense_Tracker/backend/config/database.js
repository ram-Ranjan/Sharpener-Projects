const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('expense_tracker', 'root', 'root@321', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
