const jwt = require('jsonwebtoken');
import { isEmpty } from 'lodash';
import User from 'models/User';
const Chat = require('models/Chat');
const Sequelize = require("sequelize");


const handler = async (req, res) => {
    if (req.method === 'POST') {

        const {
            body,
            body: { id: userId },
            headers
        } = req;

        try {

            if (!headers.authorization) {
                return res.status(401).send({ error: true, data: [], message: 'User Not Logged in' });
            }
            const { username } = jwt.verify(
                headers.authorization.split(' ')[1],
                process.env.SECRET_KEY
            );

            if (isEmpty(body)) {
                return res.status(400).send({ error: true, data: [], message: 'No ID send to server' });
            }

            const { id } = await User.findOne({ where: { username } });
            if (!id) {
                return res.status(400).send({ error: true, data: [], message: 'User not Found' })
            }

            const chats = await Chat.findAll({
                where: {
                    [Sequelize.Op.or]: [
                        { to: id, from: userId },
                        { to: userId, from: id },
                    ],
                }
            })
            console.log('chats: ', chats);
            const response = chats.map(({ to, from, content, createdAt }) => {
                return {
                    to: to,
                    from: from,
                    message: content,
                    time: createdAt,
                };
            });

            return res.status(200).send({ error: false, data: response, message: 'API successful' });
        }

        catch (err) {
            return res.status(500).send({ error: true, data: [], message: err.message });
        }
    }
    else {
        res.status(404).end('Page Not Found');
    }
}
export default handler;