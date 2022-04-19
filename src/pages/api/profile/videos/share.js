const AllPosts = require('models/AllPost');
const User = require('models/User');
const Share = require('models/Share');
const Video = require('models/Video');
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');
const { API, AUTH, REQUEST } = require('src/pages/api/consts');
const handler = async (req, res) => {
  if (req.method === REQUEST.GET) {
    const {
      headers: { authorization }
    } = req;

    try {
      if (!authorization) {
        return res.status(401).send({ error: true, data: [], message: AUTH.NOT_LOGGED_IN });
      }
      const { username } = jwt.verify(authorization.split(' ')[1], process.env.SECRET_KEY);

      const sharedPosts = await Share.findAll({
        include: [
          {
            model: Video
          }
        ]
      });

      // console.log('sharedPosts: ', sharedPosts);

      res.status(200).json({
        error: false,
        message: API.SUCCESS,
        data: { sharedPosts }
      });
    } catch (err) {
      console.log('Shared Posts Api Failed Error: ', err.message);
      res.status(500).send({ error: true, data: [], message: `${API.ERROR}:${err.message}` });
    }
  } else if (req.method === REQUEST.POST) {
    const {
      body,
      body: { videoId, caption },
      headers: { authorization }
    } = req;

    try {
      if (!authorization) {
        return res.status(401).send({ error: true, data: [], message: AUTH.NOT_LOGGED_IN });
      }

      const { username, id } = jwt.verify(authorization.split(' ')[1], process.env.SECRET_KEY);

      if (!body) {
        return res.status(400).send({ error: true, data: [], message: AUTH.NO_USER_SENT });
      }

      const user = await User.findOne({
        where: { id }
      });

      const video = await Video.findOne({
        attributes: ['id', 'shareCount'],
        where: { id: videoId, isApproved: true }
      });

      const share = await Share.create({
        UserId: id,
        caption,
        VideoId: video.id
      });

      const newPost = await AllPosts.create({
        VideoId: video.id,
        isShared: true,
        ShareId: share.id
      });
      await Video.update(
        { shareCount: video.shareCount + 1 },
        {
          where: {
            id: video.id
          }
        }
      );

      await share.setUser(user);
      await newPost.setShare(share);
      await newPost.setVideo(video);
      await share.setVideo(video);

      const sharedPost = await Share.findOne({
        include: [{ model: Video }],
        where: {
          UserId: id
        }
      });

      return res.status(201).json({
        error: false,
        message: 'Video Shared',
        data: { sharedPost }
        // to be continued
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
