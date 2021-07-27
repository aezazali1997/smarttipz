// const { DataTypes } = require("sequelize");
const sequelize = require("../db");


module.exports = function (sequelize, DataTypes) {
    return sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        emailConfirmed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        forgotpassConfirmed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        address: {
            type: DataTypes.STRING,
        },
        phoneNumber: {
            type: DataTypes.STRING,
        },
        picture: {
            type: DataTypes.STRING,
        },
        avgRating: {
            type: DataTypes.FLOAT,
        },
        totalRatingNum: {
            type: DataTypes.INTEGER,
        },
        totalViews: {
            type: DataTypes.INTEGER,
        },
        numTips: {
            type: DataTypes.INTEGER,
        },
        totalTipsAmount: {
            type: DataTypes.DOUBLE,
        },
        numVideos: {
            type: DataTypes.INTEGER,
        },
        about: {
            type: DataTypes.TEXT,
        },
        createdBy: {
            type: DataTypes.INTEGER,
        },
        updatedBy: {
            type: DataTypes.INTEGER,
        },
        isApproved: {
            type: DataTypes.BOOLEAN,
        },
        approvedBy: {
            type: DataTypes.INTEGER,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
        },
    });
}