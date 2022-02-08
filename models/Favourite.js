const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Favourite = sequelize.define("Favourite", {

    reviewerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

module.exports = Favourite;
