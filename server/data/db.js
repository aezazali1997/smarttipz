const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'smart-tipz',
    'postgres',
    'admin', {
    host: process.env.HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    operatorAliases: false,

});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
module.exports = sequelize;
