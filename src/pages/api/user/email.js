const jwt = require('jsonwebtoken');

const sequelize = require('sequelize');
const User = require('models/User');
import Cors from 'cors';
import initMiddleware from 'utils/init-middleWare';
import { API, AUTH, REQUEST } from 'src/pages/api/consts';

const handler = async (req, res) => {
  const cors = initMiddleware(
    Cors({
      methods: ['GET', 'POST', 'OPTIONS', 'UPDATE'],
      origin: ['https://m.stripe.com/6']
    })
  );
  await cors(req, res);

  if (req.method === REQUEST.GET) {
    try {
      if (!req.headers.authorization) {
        return res.status(401).send({ error: true, data: [], message: AUTH.NOT_LOGGED_IN });
      }
      const { username } = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY);

      const { id: userId, email } = await User.findOne({
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

      res.status(200).send({
        error: false,
        message: API.SUCCESS,
        data: { email }
      });
    } catch (err) {
      res.status(404).send({
        error: true,
        message: `${API.ERROR}:${err.message}`,
        data: []
      });
    }
  }
};

export default handler;
