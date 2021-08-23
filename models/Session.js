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
  },
  connected: {
    type: DataTypes.BOOLEAN,
  },
});

module.exports = Session;
