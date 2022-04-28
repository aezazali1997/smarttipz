const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Entity = sequelize.define('Entity', {
  title: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  }
});

module.exports = Entity;
