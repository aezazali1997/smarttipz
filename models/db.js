const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(

  process.env.NEXT_PUBLIC_DB_DATABASE,
  process.env.NEXT_PUBLIC_DB_USERNAME,
  process.env.NEXT_PUBLIC_DB_PASSWORD,
  {
    host: process.env.NEXT_PUBLIC_HOST,
    dialect: 'postgres'
  }
);

module.exports = sequelize;
