const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Share = sequelize.define("Share", {

    reviewerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    caption: {
        type: DataTypes.STRING,
    }

});

module.exports = Share;
