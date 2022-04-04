const jwt = require('jsonwebtoken');
import { isEmpty } from 'lodash';
import Session from 'models/Session';
import User from 'models/User';
const Chat = require('models/Chat');
const { API, AUTH, REQUEST } = require('src/pages/api/consts');
const Sequelize = require("sequelize");


const handler = async (req, res) => {
    if (req.method === REQUEST.GET) {
      const { headers } = req;

      try {
        let users = [];

        if (!headers.authorization) {
          return res.status(401).send({ error: true, data: [], message: AUTH.NOT_LOGGED_IN });
        }
        const { username } = jwt.verify(headers.authorization.split(' ')[1], process.env.SECRET_KEY);

        const { id } = await User.findOne({ where: { username } });
        if (!id) {
          return res.status(404).send({ error: true, data: [], message: AUTH.NO_USER_FOUND });
        }

        let userSet = new Set();
        const allMessages = await Chat.findAll({
          where: {
            [Sequelize.Op.or]: [{ to: id }, { from: id }]
          }
        });

        if (!isEmpty(allMessages)) {
          allMessages.forEach((msg) => {
            userSet.add(msg.to);
            userSet.add(msg.from);
          });

          for (let value of userSet) {
            if (value !== id) {
              const res = await Chat.findAll({
                limit: 1,
                where: {
                  [Sequelize.Op.or]: [
                    { to: id, from: value },
                    { from: id, to: value }
                  ]
                },
                order: [['createdAt', 'DESC']]
              });
              // console.log('chats: ', res);
              const { name, picture } = await User.findOne({ where: { id: value } });
              const { isRead, connected } = await Session.findOne({ where: { userId: value } });
              users.push({
                id: value,
                name: name,
                picture: picture,
                isRead: isRead,
                connected,
                lastMessage: res[0].content,
                lastMessageTime: res[0].createdAt
              });
            }
          }
          users.sort((a, b) => {
            return b.lastMessageTime - a.lastMessageTime;
          });
        }

        res.status(200).send({ error: false, data: users, message: API.SUCCESS });
      } catch (err) {
        res.status(500).send({ error: true, data: [], message: `${API.ERROR}:${err.message}` });
      }
    } else {
      res.status(404).end(API.NO_PAGE);
    }
}
export default handler;