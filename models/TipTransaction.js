const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const TipTransaction = sequelize.define('TipTransaction',{
  senderId:{
    type:DataTypes.INTEGER,
  },
  tip:{
    type:DataTypes.INTEGER,
    defaultValue:0
  },
  senderPreviousTotal:{
    type:DataTypes.DOUBLE,
    defaultValue:0
  },
  receiverId:{
    type:DataTypes.INTEGER,
  },
  received:{
    type:DataTypes.DOUBLE,
    defaultValue:0,
  },
  receiverpreviousTotal:{
    type:DataTypes.DOUBLE,
    defaultValue:0
  },
  adminReceived:{
    type:DataTypes.DOUBLE,
    defaultValue:0,
  },
  adminPreviousTotal:{
    type:DataTypes.DOUBLE,
    defaultValue:0
  },
  videoId:{
    type:DataTypes.INTEGER,
  }
})

module.exports=TipTransaction;