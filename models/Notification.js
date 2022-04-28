const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Entity = require('models/Entity');
const AllPost = require('models/AllPost');
const Notification = sequelize.define('Notification', {
  actor: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  notifier: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  allPostId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});
Entity.hasOne(Notification);
Notification.belongsTo(Entity);

module.exports = Notification;
