import BusinessCard from '../../models/BusinessCard';
// import sequelize from '../../models/db';
import Session from '../../models/Session';
import Testimonial from '../../models/Testimonial';
import Video from '../../models/Video';
// const Chat = require('../models/Chat');
const User = require('../../models/User');
const Business = require('../../models/Business');
const nodemailer = require("nodemailer");

const handler = async (req, res) => {
    User.sync({ force: true });
    Business.sync({ force: true });
    BusinessCard.sync({ force: true });
    Session.sync({ force: true });
    Video.sync({ force: true });
    Testimonial.sync({ force: true });
    // Chat.sync({ force: true });
    res.status(200).send({ message: "Tables created Successfully" });
}
export default handler;