const User = require('models/User');
const jwt = require('jsonwebtoken');
const { API, AUTH, REQUEST } = require('src/pages/api/consts');
import Cors from 'cors';
import initMiddleware from 'utils/init-middleWare';
const handler = async (req, res) => {
  const cors = initMiddleware(
    Cors({
      methods: ['GET', 'POST', 'OPTIONS', 'UPDATE'],
      origin: ['https://m.stripe.com/6']
    })
  );
  await cors(req, res);

  if (req.method === REQUEST.GET) {
    const {
      query: { id }
    } = req;

    try {
      if (!req.headers.authorization) {
        return res.status(401).send({ error: true, data: [], message: AUTH.NOT_LOGGED_IN });
      }
      const { username } = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY);

      const { id: userId } = await User.findOne({
        where: {
          username
        }
      });
      if (!userId) {
        res.status(404).send({
          error: false,
          message: AUTH.NO_USER_FOUND,
          data: {}
        });
      }

      const user = await User.find({
        where: {
          id
        }
      });
      // console.log('user ', user);
      res.status(200).send({
        error: false,
        message: API.SUCCESS,
        balance: Number(user.totalTipsAmount)
      });
    } catch (err) {
      res.status(404).send({
        error: true,
        message: `${API.ERROR}:${err.message}`,
        data: []
      });
    }
  } else {
    res.status(500).send({
      error: true,
      message: API.NO_PAGE,
      data: {}
    });
  }
};
module.exports = handler;