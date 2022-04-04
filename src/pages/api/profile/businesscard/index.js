const User = require('models/User');
const jwt = require('jsonwebtoken');
const { API,AUTH,REQUEST } = require('src/pages/api/consts');
const handler = async (req, res) => {
    if (req.method === REQUEST.GET) {
      try {
        if (!req.headers.authorization) {
          return res.status(401).send({ error: true, data: [], message: AUTH.NOT_LOGGED_IN });
        }
        const { username } = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY);

        const user = await User.findOne({
          attributes: ['id'],
          where: { username }
        });
        if (!user) {
          return res.status(404).send({ error: true, data: [], message: AUTH.NO_USER_FOUND });
        }

        const business = await user.getBusiness();

        const findBusinessCard = await business?.getBusinessCard();

        res.status(200).send({
          error: false,
          message: API.SUCCESS,
          data: {
            website: business.link,
            businessCard: {
              ownerName: findBusinessCard?.ownerName,
              email: findBusinessCard?.email,
              website: findBusinessCard?.website
            }
          }
        });
      } catch (err) {
        res.status(500).send({ error: true, data: [], message: `${API.ERROR}:${err.message}` });
      }
    } else {
      res.status(404).end(API.NO_PAGE);
    }
};

export default handler;
