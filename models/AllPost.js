const { DataTypes } = require("sequelize");
const sequelize = require("./db");
const PostLikee = require("./Like");
const Comments = require("./Comments");
const Rating = require("./Rating");

const   AllPosts = sequelize.define("AllPost", {

    isShared: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    likeCount:{
        type:DataTypes.INTEGER,
        defaultValue:0,
    },
     commentCount:{
        type:DataTypes.INTEGER,
        defaultValue:0,
    }
});

AllPosts.hasMany(PostLikee,{
    onDelete:'cascade'
});
PostLikee.belongsTo(AllPosts);

AllPosts.hasMany(Comments,{
    onDelete:'cascade'
});
Comments.belongsTo(AllPosts);

AllPosts.hasMany(Rating,{
    onDelete:'cascade'
});
Rating.belongsTo(AllPosts);


module.exports = AllPosts;
