const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Chat = sequelize.define("Chat", {
  to: {
    type: DataTypes.INTEGER,
  },
  from: {
    type: DataTypes.INTEGER,
  },
  content: {
    type: DataTypes.STRING,
  },
});

module.exports = Chat;
