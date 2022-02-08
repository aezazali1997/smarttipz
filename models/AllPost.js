const { DataTypes } = require("sequelize");
const sequelize = require("./db");
const PostLikee = require("./Like");
const Comments = require("./Comments");
const Rating = require("./Rating");

const AllPosts = sequelize.define("AllPost", {

    isShared: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

AllPosts.hasMany(PostLikee);
PostLikee.belongsTo(AllPosts);

AllPosts.hasMany(Comments);
Comments.belongsTo(AllPosts);

AllPosts.hasMany(Rating);
Rating.belongsTo(AllPosts);


module.exports = AllPosts;
