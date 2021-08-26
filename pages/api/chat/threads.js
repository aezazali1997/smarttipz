const jwt = require('jsonwebtoken');
import { isEmpty } from 'lodash';
import User from 'models/User';
const Chat = require('models/Chat');
const Sequelize = require("sequelize");


const handler = async (req, res) => {
    if (req.method === 'GET') {

        const {
            body,
            headers
        } = req;

        try {
            let users = [];

            if (!headers.authorization) {
                return res.status(401).send({ error: true, data: [], message: 'User Not Logged in' });
            }
            const { username } = jwt.verify(
                headers.authorization.split(' ')[1],
                process.env.SECRET_KEY
            );

            const { id } = await User.findOne({ where: { username } });
            console.log('id', id)
            if (!id) {
                return res.status(400).send({ error: true, data: [], message: 'User not Found' })
            }

            let userSet = new Set();
            const allMessages = await Chat.findAll({
                where: {
                    [Sequelize.Op.or]: [{ to: id }, { from: id }],
                }
            });

            if (!isEmpty(allMessages)) {

                allMessages.forEach((msg) => {
                    userSet.add(msg.to);
                    userSet.add(msg.from);
                })

                for (let value of userSet) {
                    if (value !== id) {
                        const res = await Chat.findAll({
                            limit: 1,
                            where: {
                                [Sequelize.Op.or]: [{ to: id, from: value }, { from: id, to: value }]
                            },
                            order: [["createdAt", "DESC"]],
                        });
                        console.log('chats: ', res);
                        let { name, picture } = await User.findOne({ where: { id: value } });
                        users.push({
                            id: value,
                            name: name,
                            picture: picture,
                            lastMessage: res[0].content,
                            lastMessageTime: res[0].createdAt,
                        });
                    }
                }
                users.sort((a, b) => {
                    return (
                        b.lastMessageTime - a.lastMessageTime
                    )
                })
            }

            res.status(200).send({ error: false, data: users, message: 'Users fetched successfully' });
        }

        catch (err) {
            res.status(500).send({ error: true, data: [], message: err.message });
        }
    }
    else {
        res.status(404).end('Page Not Found');
    }
}
export default handler;