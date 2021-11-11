const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Comment = sequelize.define("Comment", {

    reviewerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING(500),
        allowNull: false
    }
});

module.exports = Comment;
