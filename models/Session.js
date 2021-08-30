const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Session = sequelize.define("Session", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
  },
  sessions: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  connected: {
    type: DataTypes.BOOLEAN,
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Session;
