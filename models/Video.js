const { DataTypes } = require("sequelize");
const AllPosts = require("./AllPost");
const sequelize = require("./db");
const Favourite = require("./Favourite");
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
  productLink: {
    type: DataTypes.STRING
  },
  watchLimit: {
    type: DataTypes.INTEGER,
    defaultValue: 0
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


Video.hasMany(Favourite);
Favourite.belongsTo(Video);

Video.hasMany(AllPosts);
AllPosts.belongsTo(Video);

Video.hasMany(Share);
Share.belongsTo(Video);


module.exports = Video;
