const BusinessCard = require('../../models/BusinessCard');
// import sequelize from '../../models/db';
const Session = require('../../models/Session');
const Testimonial = require('../../models/Testimonial');
const Video = require('../../models/Video');
const Chat = require('../../models/Chat');
const User = require('../../models/User');
const Business = require('../../models/Business');

const handler = async (req, res) => {
    User.sync({ alter: true });
    // Business.sync({ force: true });
    // BusinessCard.sync({ force: true });
    // Session.sync({ alter: true });
    // Video.sync({ force: true });
    // Testimonial.sync({ alter: true });
    // Chat.sync({ force: true });
    res.status(200).send({ message: "Tables created Successfully" });
}
export default handler;