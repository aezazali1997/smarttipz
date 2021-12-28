const { DataTypes } = require("sequelize");
const Comment = require("./Comments");
const sequelize = require("./db");
const Favourite = require("./Favourite");
const PostLike = require("./Like");
const Share = require("./Share");

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
  videoType: {
    type: DataTypes.STRING
  },
  videoCost: {
    type: DataTypes.STRING
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
  isShowOnNewsfeed: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  isApproved: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  approvedBy: {
    type: DataTypes.INTEGER,
  },
});

Video.hasMany(PostLike);
PostLike.belongsTo(Video);

Video.hasMany(Share);
Share.belongsTo(Video);

Video.hasMany(Favourite);
Favourite.belongsTo(Video);

Video.hasMany(Comment);
Comment.belongsTo(Video);


module.exports = Video;
