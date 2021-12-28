const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Comments = sequelize.define("Comment", {

    message: {
        type: DataTypes.STRING(500),
        allowNull: false
    }
});

module.exports = Comments;
