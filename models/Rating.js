const { DataTypes } = require("sequelize");
const AllPosts = require("./AllPost");
const sequelize = require("./db");

const Rating = sequelize.define("Rating", {

    reviewerId: {
        type: DataTypes.INTEGER,
    },
    rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    }

});


module.exports = Rating;
