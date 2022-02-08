const { DataTypes } = require("sequelize");
const AllPosts = require("./AllPost");
const sequelize = require("./db");

const Share = sequelize.define("Share", {

    caption: {
        type: DataTypes.STRING,
    }

});

Share.hasMany(AllPosts);
AllPosts.belongsTo(Share);

module.exports = Share;
