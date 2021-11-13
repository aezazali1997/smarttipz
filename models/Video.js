const { DataTypes } = require("sequelize");
// const Comment = require("./Comment");
const sequelize = require("./db");
const PostLike = require("./Like");

const Video = sequelize.define("Video", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING
  },
  catalogue: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  language: {
    type: DataTypes.STRING
  },
  isFree: {
    type: DataTypes.BOOLEAN,
  },
  agree: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  mediaType: {
    type: DataTypes.STRING,
  },
  isApproved: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  rating: {
    type: DataTypes.INTEGER,
  },
  tip: {
    type: DataTypes.INTEGER,
  },
  comment: {
    type: DataTypes.INTEGER,
  },
  approvedBy: {
    type: DataTypes.INTEGER,
  },
});

Video.hasMany(PostLike);
PostLike.belongsTo(Video);

// Video.hasMany(Comment);
// Comment.belongsTo(Video);


module.exports = Video;
