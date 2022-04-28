import Entity from 'models/Entity';
import Video from 'models/Video';

const AllPosts = require('models/AllPost');
const PostLike = require('models/Like');
const User = require('models/User');
const jwt = require('jsonwebtoken');
const Notification = require('models/Notification');
const sequelize = require('sequelize');
const handler = async (req, res) => {
  const { API, AUTH, REQUEST } = require('src/pages/api/consts');

  if (req.method === REQUEST.GET) {
    try {
      // if (!req.headers.authorization) {
      //     return res.status(401).send({ error: true, data: [], message: 'Please Login' })
      // }
      // const { username } = jwt.verify(
      //     req.headers.authorization.split(' ')[1],
      //     process.env.SECRET_KEY
      // );

      // const videos = await Video.findAll({
      //     where: {
      //         isApproved: true,
      //         category: {
      //             [sequelize.Op.not]: 'catalogue'
      //         },
      //     },
      //     order: [["createdAt", "DESC"]]
      // });

      res.status(200).json({
        error: false,
        message: API.SUCCESS,
        data: {}
      });
    } catch (err) {
      console.log('Videos Api Failed Error: ', err.message);
      res.status(500).send({ error: true, data: [], message: `${API.ERROR}:${err.message}` });
    }
  } else if (req.method === REQUEST.POST) {
    const {
      body,
      body: { postId },
      headers: { authorization }
    } = req;

    try {
      if (!authorization) {
        return res.status(401).send({ error: true, data: [], message: AUTH.NOT_LOGGED_IN });
      }

      const { username } = jwt.verify(authorization.split(' ')[1], process.env.SECRET_KEY);

      if (!body) {
        return res.status(400).send({ error: true, data: [], message: AUTH.NO_USER_SENT });
      }

      const { id } = await User.findOne({
        attributes: ['id'],
        where: { username, isBlocked: false, isDeleted: false }
      });

      // console.log('id => ', id);

      const allPost = await AllPosts.findOne({
        attributes: ['id', 'likeCount', 'VideoId'],
        where: { id: postId }
      });

      const post = await PostLike.findOne({ where: { AllPostId: postId, reviewerId: id } });
      const { UserId: notifier } = await Video.findById(allPost.VideoId);

      if (post === null) {
        const like = await PostLike.create({
          reviewerId: id,
          isLiked: true
        });
        // console.log('post id',postId);
        // console.log("allPost",allPost.likeCount+1);
        const likeCount = await AllPosts.update({ likeCount: allPost.likeCount + 1 }, { where: { id: postId } });
        await like.setAllPost(allPost);
        // get the actor who likes the video %*%* Done
        // get the notififer whose video is liked
        // create a notification
        // alert the user about the notification
        const entity = await Entity.find({
          where: {
            title: 'like'
          }
        });
        await Notification.create({
          actor: id,
          notifier: notifier,
          EntityId: entity.id,
          allPostId: postId
        });

        return res.status(201).json({
          error: false,
          message: API.SUCCESS,
          data: {}
        });
      }
      await PostLike.destroy({ where: { reviewerId: id } });
      const likeCount = await AllPosts.update({ likeCount: allPost.likeCount - 1 }, { where: { id: postId } });

      const entity = await Entity.find({
        where: {
          title: 'like'
        }
      });
      await Notification.destroy({
        where: {
          actor: id,
          EntityId: entity.id,
          allPostId: postId
        }
      });

      res.status(200).json({
        error: false,
        message: API.SUCCESS,
        data: {}
      });
    } catch (err) {
      console.log('Videos Api Failed Error: ', err.message);
      res.status(500).send({ error: true, data: [], message: `${API.ERROR}:${err.message}` });
    }
  } else {
    res.status(404).end(API.NO_PAGE);
  }
};

export default handler;
