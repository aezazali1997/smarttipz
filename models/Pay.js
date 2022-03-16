const { DataTypes } = require("sequelize");
const sequelize = require("./db");


const Pay = sequelize.define('Pay',{
  userId:{
    type:DataTypes.INTEGER,
  },
  videoId:{
    type:DataTypes.INTEGER
  }
})
module.exports=Pay;