const AllPosts = require('models/AllPost');

const jwt = require('jsonwebtoken');
const User = require('models/User');
const Video = require('models/Video');
const Joi = require('joi');

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { body } = req;

    const validateUploadVideo = (data) => {
      const schema = Joi.object({
        url: Joi.string().required(),
        category: Joi.string().required(),
        description: Joi.string().optional().allow('').allow(null),
        language: Joi.string().required(),
        thumbnail: Joi.string().optional().allow('').allow(null),
        title: Joi.string().required(),
        url: Joi.string().required(),
        mediaType: Joi.string().required(),
        videoType: Joi.string().required(),
        videoCost: Joi.string().required(),
        agree: Joi.required(),
        isShowOnNewsfeed: Joi.optional()
      });
      return schema.validate(data);
    };

    console.log(body);

    const { error } = validateUploadVideo(req.body);

    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
      if (!req.headers.authorization) {
        throw new Error('Please Login');
      }
      const { username } = jwt.verify(
        req.headers.authorization.split(' ')[1],
        process.env.SECRET_KEY
      );

      const user = await User.findOne({ where: { username } });
      if (!user) {
        throw new Error('Please Login');
      }

      // const video = await Video.findOne({ where: { url: req.body.link } });
      // if (video) throw new Error('Video already exists');
      const {
        url,
        mediaType,
        agree,
        title,
        isShowOnNewsfeed,
        language,
        description,
        thumbnail,
        category,
        videoType,
        videoCost
      } = body;

      const newVideo = await Video.create({
        title,
        description,
        agree,
        mediaType,
        url,
        language,
        thumbnail,
        category,
        videoType,
        videoCost,
        isShowOnNewsfeed
      });

      const newPost = await AllPosts.create({
        VideoId: newVideo.id,
        isShared: false
      });

      await newPost.setVideo(newVideo);
      await newVideo.setUser(user);
      res.status(201).json({ error: false, message: 'Post submitted successfully', data: [] });
    } catch (err) {
      res.status(401).json({ error: true, message: err.message, data: [] });
    }
  } else {
    res.status(404).end('Page Not Found');
  }
};

export default handler;
