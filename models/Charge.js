const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const User = require('models/User');
const Charge = sequelize.define('Charge', {
  cardId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  customerId: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
Charge.belongsTo(User);
User.hasMany(Charge);
module.exports = Charge;
