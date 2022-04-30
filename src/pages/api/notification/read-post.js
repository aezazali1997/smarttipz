const Notification = require('models/Notification');
const Entity = require('models/Entity');
const AllPost = require('models/AllPost');
const jwt = require('jsonwebtoken');
const { API, AUTH, REQUEST } = require('src/pages/api/consts');
const User = require('models/User');
const Video = require('models/Video');
const AllPosts = require('models/AllPost');
const PostLikee = require('models/Like');
const Favourite = require('models/Favourite');
const handler = async (req, res) => {
  if (req.method === REQUEST.POST) {
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
      const { actor, postId, entityId } = req.body;
      await Notification.update(
        { isRead: true },
        {
          where: {
            actor,
            notifier: user.id,
            allPostId: postId,
            EntityId: entityId
          }
        }
      );
      return res.status(201).send({
        error: false,
        message: 'API updated',
        data: {}
      });
    } catch (error) {
      console.log('error', error.message);
      return res.status(404).send('error:' + error.message);
    }
  }
};
module.exports = handler;
