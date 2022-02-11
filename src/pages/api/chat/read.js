const jwt = require('jsonwebtoken');
import { isEmpty } from 'lodash';
import Session from 'models/Session';
import User from 'models/User';
const Chat = require('models/Chat');
const Sequelize = require("sequelize");


const handler = async (req, res) => {
    if (req.method === 'POST') {

        const {
            body,
            body: { recieverID },
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
                return res.status(400).send({ error: true, data: [], message: 'No RecieverID send to server' });
            }

            const { id } = await User.findOne({ where: { username: username } });

            const chats = await Chat.findAll({
                limit: 1,
                where: {
                    [Sequelize.Op.or]: [{ to: id, from: recieverID }, { from: id, to: recieverID }]
                },
                order: [["createdAt", "DESC"]],
            });

            console.log('chats: ', chats);

            const { name, picture } = await User.findOne({ where: { id: recieverID } });
            const { isRead, connected } = await Session.update({ isRead: true }, {
                where: { userId: recieverID },
                returning: true, // needed for affectedRows to be populated
                plain: true
            });

            const response = {
                id: recieverID,
                name: name,
                picture: picture,
                isRead: true,
                connected,
                lastMessage: chats[0].content,
                lastMessageTime: chats[0].createdAt,

            }

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