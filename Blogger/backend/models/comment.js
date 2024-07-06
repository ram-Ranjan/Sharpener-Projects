const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Blog = require('./Blog');

const Comment = sequelize.define('Comment', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

Blog.hasMany(Comment);
Comment.belongsTo(Blog);

module.exports = Comment;