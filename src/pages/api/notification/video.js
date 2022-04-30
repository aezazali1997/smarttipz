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
    try {
      const { allPostId } = req.query;

      const allPost = await AllPost.findOne({
        where: {
          id: allPostId
        }
      });
      let id = allPost.VideoId;
      const video = await Video.findOne({
        where: {
          id
        }
      });

      let isLiked = await PostLikee.find({
        where: {
          AllPostId: allPostId,
          reviewerId: user.id
        }
      });
      let isFavourite = await Favourite.findOne({
        where: {
          reviewerId: user.id,
          VideoId: id
        }
      });

      isLiked = isLiked ? true : false;
      isFavourite = isFavourite !== null ? true : false;

      return res
        .status(200)
        .json({ error: false, message: API.SUCCESS, data: { video, user, allPost, isLiked, isFavourite } });
    } catch (error) {
      console.log('error', error.message);
      return res.status(404).send('error:' + error.message);
    }
  }
};
module.exports = handler;
