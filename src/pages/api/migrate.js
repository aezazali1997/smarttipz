import Favourite from 'models/Favourite';

const Share = require('models/Share');

const sequelize = require('models/db');

const BusinessCard = require('models/BusinessCard');
const Session = require('models/Session');
const Testimonial = require('models/Testimonial');
const Video = require('models/Video');
const Like = require('models/Like');
const Chat = require('models/Chat');
const User = require('models/User');
const Business = require('models/Business');

const handler = async (req, res) => {
    // sequelize.sync({ force: true });
    // User.sync({ force: true });
    // await Business.sync({ force: true });
    // await BusinessCard.sync({ force: true });
    // await Session.sync({ force: true });
    Video.sync({ alter: true });
    Favourite.sync({ force: true });
    // Like.sync({ alter: true });
    // Share.sync({ alter: true });
    // await Testimonial.sync({ force: true });
    // await Chat.sync({ force: true });
    res.status(200).send({ message: "Tables created Successfully" });
}
export default handler;