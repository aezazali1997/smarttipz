const Notification = require('models/Notification');
const Entity = require('models/Entity');
const AllPost = require('models/AllPost');
const jwt = require('jsonwebtoken');
const { API, AUTH, REQUEST } = require('src/pages/api/consts');
const User = require('models/User');
const Video = require('models/Video');
const AllPosts = require('models/AllPost');
const handler = async (req, res) => {
  if (req.method === REQUEST.GET) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).send({
        error: true,
        message: AUTH.NOT_LOGGED_IN,
        data: []
      });
    }
    const { username } = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY);
    const user = await User.find({
      where: {
        username
      }
    });
    if (!user) {
      res.status(404).send({
        error: false,
        message: AUTH.NO_USER_FOUND,
        data: {}
      });
    }
    console.log('id------------------', user.id);
    try {
      // get all the noridications of the current logged in user

      const notifications = await Notification.findAll({
        where: {
          notifier: user.id
        },
        order: [['createdAt', 'DESC']]
      });
      // get the actors User data
      let tmp_notifications = [];
      console.log('notifications', notifications);
      for (let i = 0; i < notifications.length; i++) {
        let actor = notifications[i].actor;
        let user = await User.findOne({
          attributes: ['id', 'name', 'picture'],
          where: {
            id: actor
          }
        });

        let notif = {
          time: notifications[i].createdAt,
          userDetails: user,
          postId: notifications[i].allPostId,
          isRead: notifications[i].isRead,
          entityId: notifications[i].EntityId
        };
        tmp_notifications.push(notif);
      }

      return res.status(200).json({ error: false, message: API.SUCCESS, data: tmp_notifications });
    } catch (error) {
      return res.status(404).send();
    }
  } else if (req.method === REQUEST.POST) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).send({
        error: true,
        message: AUTH.NOT_LOGGED_IN,
        data: []
      });
    }
    const { username } = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY);
    const user = await User.find({
      where: {
        username
      }
    });
    if (!user) {
      res.status(404).send({
        error: false,
        message: AUTH.NO_USER_FOUND,
        data: {}
      });
    }
    try {
      const res = await Notification.update(
        {
          isRead: true
        },
        {
          where: {
            notifier: user.id
          }
        }
      );
      return res.status(201).send({
        error: false,
        message: API.SUCCESS,
        data: {}
      });
    } catch (error) {
      console.log('ERROR', error.message);
      return res.status(404).send({
        error: false,
        message: API.ERROR,
        data: {}
      });
    }
  }
};
module.exports = handler;
