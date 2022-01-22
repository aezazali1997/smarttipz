import AllPosts from 'models/AllPost';
import Rating from 'models/Rating';

const sequelize = require('models/db');

const Share = require('models/Share');
const BusinessCard = require('models/BusinessCard');
const Session = require('models/Session');
const Testimonial = require('models/Testimonial');
const Video = require('models/Video');
const Like = require('models/Like');
const Chat = require('models/Chat');
const User = require('models/User');
const Business = require('models/Business');
const Comment = require('models/Comments');

const handler = async (req, res) => {
    sequelize.sync({ force: true });
    // AllPosts.sync({ alter: true });
    // Rating.sync({ force: true });
    // User.sync({ alter: true });
    // await Business.sync({ force: true });
    // await BusinessCard.sync({ force: true });
    // await Session.sync({ force: true });
    // Comment.sync({ force: true });
    // Share.sync({ alter: true });
    // Video.sync({ alter: true });
    // Like.sync({ force: true });
    // Favourite.sync({ force: true });
    // Share.sync({ alter: true });
    // await Testimonial.sync({ force: true });
    // await Chat.sync({ force: true });
    res.status(200).send({ message: "Tables created Successfully" });
}
export default handler;