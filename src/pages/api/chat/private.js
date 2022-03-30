import { isEmpty } from 'lodash';
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
import User from 'models/User';
const Chat = require('models/Chat');
const { API, AUTH, REQUEST } = require('src/pages/api/consts');

const handler = async (req, res) => {
  if (req.method === REQUEST.POST) {
    const {
      body,
      body: { id: userId },
      headers
    } = req;

    try {
      if (!headers.authorization) {
        return res.status(401).send({ error: true, data: [], message: AUTH.NOT_LOGGED_IN });
      }
      const { username } = jwt.verify(headers.authorization.split(' ')[1], process.env.SECRET_KEY);

      if (isEmpty(body)) {
        return res.status(400).send({ error: true, data: [], message: AUTH.NO_BODY });
      }

      const { id } = await User.findOne({ where: { username } });
      if (!id) {
        return res.status(404).send({ error: true, data: [], message: AUTH.USER_NOT_FOUND });
      }

      const chats = await Chat.findAll({
        where: {
          [Sequelize.Op.or]: [
            { to: id, from: userId },
            { to: userId, from: id }
          ]
        }
      });
      // console.log('chats: ', chats);
      const response = chats.map(({ to, from, content, createdAt }) => {
        return {
          to: to,
          from: from,
          message: content,
          time: createdAt
        };
      });

      return res.status(200).send({ error: false, data: response, message: API.SUCCESS });
    } catch (err) {
      return res.status(500).send({ error: true, data: [], message: API.ERROR });
    }
  } else {
    res.status(404).end(API.NO_PAGE);
  }
};
export default handler;
