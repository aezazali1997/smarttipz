const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Like = sequelize.define("Like", {

    reviewerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Like;
