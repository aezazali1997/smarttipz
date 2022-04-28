import AllPosts from 'models/AllPost';
import Rating from 'models/Rating';
const sequelize = require('models/db');
const Admin = require('models/Admin');
const Views = require('models/Views');
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
const TipTransaction = require('models/TipTransaction');
const Pay = require('models/Pay');
const BankDetail = require('models/BankDetail');
const WithDrawRequest = require('models/WithDrawRequest');
const Charge = require('models/Charge');
const Entity = require('models/Entity');
const Notification = require('models/Notification');
const handler = async (req, res) => {
  // force: delets all data and creates a new table
  // alter: updates the data
  // Entity.sync({ alter: true });
  Notification.sync({ force: true });
  // Admin.sync({alter:true})
  // BankDetail.sync({
  // alter:true
  // })
  // User.sync({ alter: true });
  // WithDrawRequest.sync({
  // alter:true
  // })
  // sequelize.sync({ force: true });
  // Views.sync({force:true});
  // AllPosts.sync({ alter:true });
  // Video.sync({ alter: true });
  // Rating.sync({ alter: true });
  // Comment.sync({ alter: true });
  // Share.sync({ alter: true });
  // Like.sync({ alter: true });
  // Share.sync({ alter: true });
  // await Business.sync({ force: true });
  // await BusinessCard.sync({ force: true });
  // await Session.sync({ force: true });
  // Favourite.sync({ force: true });
  // await Testimonial.sync({ force: true });
  // await Chat.sync({ force: true });
  // TipTransaction.sync({alter:true})
  // Pay.sync({
  // alter:true
  // })
  // User.sync({ alter: true });
  // Charge.sync({
  // alter: true
  // });
  res.status(200).send({ message: 'New Table created Successfully' });
};;;
export default handler;