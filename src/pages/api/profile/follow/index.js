const User = require('models/User');
const jwt = require('jsonwebtoken');

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      if (!req.headers.authorization) {
        return res.status(401).send({ error: true, data: [], message: 'Please Login' });
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
        return res.status(404).send({ error: true, data: [], message: 'User Not Found' });
      }

      const followers = await user.getFollower();

      const followed = await user.getFollowed();

      res.status(200).json({
        error: false,
        data: {
          followers: followers,
          followed: followed
        },
        message: 'Data Fetched Successfully'
      });
    } catch (err) {
      res.status(500).send({ error: true, data: [], message: err.message });
    }
  } else {
    res.status(404).end('Page Not Found');
  }
};

export default handler;
