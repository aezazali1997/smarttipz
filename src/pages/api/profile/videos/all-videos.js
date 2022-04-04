
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');
const PostLikee = require('models/Like');
const Share = require('models/Share');
const User = require('models/User');
const Video = require('models/Video');
const {API,AUTH,REQUEST} = require('src/pages/api/consts')

const handler = async (req, res) => {
	if (req.method === REQUEST.GET) {
    try {
      if (!req.headers.authorization) {
        return res.status(401).send({ error: true, data: [], message: AUTH.NOT_LOGGED_IN });
      }
      const { username } = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY);

      const { id } = await User.findOne({
        attributes: ['id'],
        where: { username, isDeleted: false, isBlocked: false }
      });

      const videos = await Video.findAll({
        attributes: {
          include: [
            [sequelize.fn('COUNT', sequelize.col('PostLikees.id')), 'likeCount'],
            [sequelize.fn('COUNT', sequelize.col('Shares.VideoId')), 'shareCount'],
            [sequelize.where(sequelize.col('PostLikees.reviewerId'), id), 'isLiked']
          ]
        },
        include: [
          {
            model: PostLikee,
            attributes: ['isLiked', 'VideoId', 'reviewerId', 'id']
          },
          {
            model: User,
            attributes: ['name', 'username', 'picture']
          },
          {
            model: Share,
            attributes: ['id']
          }
        ],
        where: {
          [sequelize.Op.and]: [
            {
              isApproved: {
                [sequelize.Op.eq]: true
              }
            }
          ]
        },
        group: [
          'Video.id',
          'PostLikees.id',
          'Shares.id',
          'Shares.VideoId',
          'User.id',
          'User.name',
          'User.picture',
          'User.username',
          'PostLikees.reviewerId',
          'PostLikees.isLiked'
        ],
        order: [['createdAt', 'DESC']]
      });

      res.status(200).json({
        error: false,
        message: API.SUCCESS,
        data: { videos }
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
