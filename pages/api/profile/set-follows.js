const User = require('../../../models/User');
const jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const {
            headers,
            body,
            body: { followID }
        } = req;

        try {
            if (!headers.authorization) {
                return res.status(401).send({ error: true, data: [], message: 'Please Login' })
            }
            const { username } = jwt.verify(
                headers.authorization.split(' ')[1],
                process.env.SECRET_KEY
            );

            const user = await User.findOne({
                attributes: ['id'],
                where: { username }
            });
            if (!user) {
                return res.status(404).send({ error: true, data: [], message: 'User Not Found' })
            }

            const otherUser = await User.findOne({ where: { id: followID } });
            if (!otherUser) {
                return res.status(404).json({ error: true, message: 'User Not Found', data: [] });
            }

            const alreadyFollowed = await user.getFollower();
            if (!alreadyFollowed) {
                await user.setFollowed(otherUser);
                await otherUser.setFollower(user);
            }

            res.status(201).send({
                error: false,
                message: 'Data fetched successfully',
                data: []
            });
        } catch (err) {
            res.status(500).send({ error: true, data: [], message: err.message });
        }
    } else {
        res.status(404).end('Page Not Found');
    }
};

export default handler;