const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Comments = sequelize.define("Comment", {

    reviewerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING(500),
        allowNull: false
    }
});

module.exports = Comments;
