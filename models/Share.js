const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Share = sequelize.define("Share", {

    reviewerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

});

module.exports = Share;
