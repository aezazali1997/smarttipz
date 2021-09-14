import { includes, isEmpty } from 'lodash';

const User = require('../../../models/User');
const jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const {
            headers,
            body,
            body: { username: otheruser }
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

            const otherUser = await User.findOne({ attributes: ['id'], where: { username: otheruser } });

            if (!otherUser) {
                return res.status(404).json({ error: true, message: 'Other User Not Found', data: [] });
            }

            console.log(otherUser);
            const follower = await user.getFollower({ where: { followedId: otherUser.id } });
            const followed = await user.getFollowed({ where: { followingId: user.id } });
            console.log('alreadyFollowed: ', follower);

            if (!isEmpty(follower) || !isEmpty(followed)) {
                await user.setFollowed(otherUser);
                await otherUser.setFollower(user);
                res.status(201).send({
                    error: false,
                    message: 'Data fetched successfully',
                    data: { follow: true }
                });
            }
            else {
                await following.destroy();
                await followed.destroy();
                res.status(201).send({
                    error: false,
                    message: 'Data fetched successfully',
                    data: { follow: false }
                });
            }


        } catch (err) {
            res.status(500).send({ error: true, data: [], message: err.message });
        }
    } else {
        res.status(404).end('Page Not Found');
    }
};

export default handler;