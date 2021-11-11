const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const PostLikee = sequelize.define("PostLikee", {

    reviewerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isLiked: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

module.exports = PostLikee;
