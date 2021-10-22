const User = require('../../../models/User');
const Video = require('../../../models/Video');
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      if (!req.headers.authorization) {
        return res.status(401).send({ error: true, data: [], message: 'Please Login' })
      }
      const { username } = jwt.verify(
        req.headers.authorization.split(' ')[1],
        process.env.SECRET_KEY
      );

      const user = await User.findOne({
        attributes: ['id'],
        where: { username }
      });

      if (!user) {
        return res.status(404).send({ error: true, data: [], message: 'User Not Found' })
      }
      const { id } = user;

      const videos = await Video.findAll({
        where: {
          UserId: id,
          isApproved: true,
          category: {
            [sequelize.Op.not]: 'catalogue'
          },
        },
        order: [["createdAt", "DESC"]]
      });

      res.status(200).json({
        message: 'success',
        data: { videos }
      });
    } catch (err) {
      console.log("Videos Api Failed Error: ", err.message);
      res.status(500).send({ error: true, data: [], message: err.message });
    }
  } else {
    res.status(404).end('Page Not Found');
  }
};

export default handler;
