const connection = require('../data/db');
const { DataTypes } = require('sequelize');

const user = require('./models/user');

module.exports = {
    User: user(connection, DataTypes),
    Connection: connection,
};
