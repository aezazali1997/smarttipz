const User = require('../../models/User');
const Business = require('../../models/Business');
const BusinessCard = require('../../models/BusinessCard');
// const Chat = require('../../models/Chat');
// const Session = require('../../models/Session');
const Testimonial = require('../../models/Testimonial');
const Video = require('../../models/Video');
const VideoCategory = require('../../models/VideoCategory');
const Session = require('../../models/Session');

const sequelize = require('../../models/db');

const handler = (req, res) => {
  try {
    // await sequelize.close();
    // await sequelize.authenticate();

    Business.sync({ force: true });
    User.sync({ force: true });
    BusinessCard.sync({ force: true });
    Testimonial.sync({ force: true });
    VideoCategory.sync({ force: true });
    Video.sync({ force: true });
    Session.sync({ force: true });
    // await sequelize.sync({ force: true });
    // await User.destroy({ where: {}, truncate: true });
    // await Businsess.destroy({ where: {}, truncate: true });
    // await BusinsessCard.destroy({ where: {}, truncate: true });
    // await Testimonial.destroy({ where: {}, truncate: true });
    // await Video.destroy({ where: {}, truncate: true });
    // await VideoCategory.destroy({ where: {}, truncate: true });

    // sequelize.sync({ force: true });

    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  res.send('done');
};

export default handler;
