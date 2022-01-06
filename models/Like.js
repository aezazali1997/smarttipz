const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const PostLikee = sequelize.define("PostLikee", {
    reviewerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = PostLikee;
