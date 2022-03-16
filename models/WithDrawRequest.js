const {DataTypes} = require('sequelize');
 const sequelize = require('./db');

 const WithDrawRequest = sequelize.define('WithDrawRequest',{
   amount:{
     type: DataTypes.DOUBLE,
     defaultValue:0,     
   },
   status:{
     type:DataTypes.BOOLEAN,
     defaultValue:false,
   }
 });
 module.exports=WithDrawRequest;