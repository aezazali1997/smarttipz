const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Testimonial = sequelize.define('Testimonial', {
  username: {
    type: DataTypes.STRING
  },
  ownerName: {
    type: DataTypes.STRING
  },
  ownerEmail: {
    type: DataTypes.STRING
  },
  designation: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING(700)
  },
  picture: {
    type: DataTypes.STRING,
    defaultValue: 'https://thumbs.dreamstime.com/b/solid-purple-gradient-user-icon-web-mobile-design-interface-ui-ux-developer-app-137467998.jpg'
  },
  token: {
    type: DataTypes.STRING(700),
    allowNull: true,
    defaultValue: '',
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isVisible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Testimonial;
