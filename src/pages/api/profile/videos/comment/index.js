import AllPosts from 'models/AllPost';

const Comment = require('models/Comments');
const jwt = require('jsonwebtoken');
const User = require('models/User');
const Video = require('models/Video');
const sequelize = require('sequelize');

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const {
      headers: { authorization },
      query: { videoId }
    } = req;

    try {
      if (!authorization) {
        return res.status(401).send({ error: true, data: [], message: 'Please Login' });
      }
      const { username } = jwt.verify(authorization.split(' ')[1], process.env.SECRET_KEY);

      const comments = await Comment.findAll({
        include: [
          {
            model: User,
            attributes: ['id', 'name', 'username', 'showName', 'showUsername', 'accountType', 'picture', 'createdAt']
          }
        ],
        where: { AllPostId: videoId },
        order: [['createdAt', 'DESC']]
      });

      console.log('sharedPosts: ', comments);

      res.status(200).json({
        error: false,
        message: 'success',
        data: { comments }
      });
    } catch (err) {
      console.log('Shared Posts Api Failed Error: ', err.message);
      res.status(500).send({ error: true, data: [], message: err.message });
    }
  } else if (req.method === 'POST') {
    const {
      body,
      body: { videoId, comment: message },
      headers: { authorization }
    } = req;

    try {
      if (!authorization) {
        return res.status(401).send({ error: true, data: [], message: 'Please Login' });
      }

      const { username } = jwt.verify(authorization.split(' ')[1], process.env.SECRET_KEY);

      const user = await User.findOne({
        attributes: ['id'],
        where: { username, isDeleted: false, isBlocked: false }
      });

      if (!body) {
        return res.status(400).send({ error: true, data: [], message: 'No data passed to server' });
      }

      const allPost = await AllPosts.findOne({
        attributes: ['id', 'commentCount'],
        where: { id: videoId }
      });

      const comment = await Comment.create({
        OwnerId: user.id,
        message,
        AllPostId: videoId
      });
      await AllPosts.update(
        { commentCount: allPost.commentCount + 1 },
        {
          where: {
            id: allPost.id
          }
        }
      );
      await comment.setUser(user);
      await comment.setAllPost(allPost);

      return res.status(201).json({
        error: false,
        message: 'Comment posted',
        data: {}
      });
    } catch (err) {
      console.log('post Comment Api Failed Error: ', err.message);
      res.status(500).send({ error: true, data: [], message: err.message });
    }
  } else {
    res.status(404).end('Page Not Found');
  }
};

export default handler;
