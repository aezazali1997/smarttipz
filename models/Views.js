const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Video = require('./Video');
const User = require('./User');

const Views = sequelize.define('Views', {});
Views.belongsTo(Video);
Video.hasMany(Views);
Views.belongsTo(User);
User.hasMany(Views);
module.exports=Views;