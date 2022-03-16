const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Admin = sequelize.define('Admin', {
    name: {
        type: DataTypes.STRING
    },
    // username: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     unique: true
    // },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permissions: {
        type: DataTypes.JSON({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING
            },
            value: {
                type: DataTypes.STRING
            }
        })
    },
    isDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    totalAmount:{
        type:DataTypes.DOUBLE,
        defaultValue:0,
    }
});

// Admin.hasMany(PermissionType, { as: 'Permissions' });
// PermissionType.belongsTo(Admin);

module.exports = Admin;
