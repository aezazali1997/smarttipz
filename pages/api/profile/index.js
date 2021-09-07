const User = require('../../../models/User');
const jwt = require('jsonwebtoken');

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      if (!req.headers.authorization) {
        return res.status(401).send({ error: true, data: [], message: 'Please Login' })
      };
      const { username } = jwt.verify(
        req.headers.authorization.split(' ')[1],
        process.env.SECRET_KEY
      );


      const user = await User.findOne({
        attributes: [
          'name',
          'email',
          'avgRating',
          'totalViews',
          'about',
          'picture',
          'phoneNumber',
          'showPhone',
          'accessible',
          'accountType'
        ],
        where: { username }
      });
      if (!user) {
        return res.status(404).send({ error: true, data: [], message: 'User Not Found' })
      }

      const { name, email, avgRating, totalViews, about, picture, phoneNumber, showPhone, accessible,
        accountType } = user;

      res.status(200).json({
        error: false,
        message: 'Data fetched successfully',
        data: {
          name: name,
          email: email,
          username,
          rating: avgRating,
          views: totalViews,
          about: about,
          picture: picture,
          phone: phoneNumber,
          showPhone: showPhone,
          accessible: accessible,
          showPhone: showPhone,
          accountType: accountType
        }
      });
    } catch (err) {
      res.status(500).send({ error: true, data: [], message: err.message });
    }
  } else {
    res.status(404).end('Page Not Found');
  }
};

export default handler;