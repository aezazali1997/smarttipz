import { includes, isEmpty } from 'lodash';

const User = require('../../../models/User');
const jwt = require('jsonwebtoken');

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { headers, body, body: { username: otheruser } } = req;

    try {
      if (!headers.authorization) {
        return res.status(401).send({ error: true, data: [], message: 'Please Login' });
      }
      const { username } = jwt.verify(headers.authorization.split(' ')[1], process.env.SECRET_KEY);

      if (isEmpty(body)) {
        return res.status(404).send({ error: true, data: [], message: 'No data passed to server' });
      }

      const user = await User.findOne({
        attributes: ['id'],
        where: { username }
      });
      if (!user) {
        return res.status(404).send({ error: true, data: [], message: 'User Not Found' });
      }

      const otherUser = await User.findOne({
        attributes: ['id'],
        where: { username: otheruser }
      });

      if (!otherUser) {
        return res.status(404).json({ error: true, message: 'Other User Not Found', data: [] });
      }

      const followings = await user.getFollowed();
      const following = followings.find((follow) => follow.id === otherUser.id);

      if (following) {
        const newFollowings = followings.filter((follow) => follow.id !== otherUser.id);
        // const otherFollowers = await otherUser.getFollower();
        // const newOtherFollowers = await otherFollowers.filter((follow) => follow.id !== user.id);

        await user.setFollowed(newFollowings);
        // await otherUser.setFollower(newOtherFollowers);

        res.status(201).send({
          error: false,
          message: 'Data fetched successfully',
          data: { follow: false }
        });
      } else {
        await user.addFollowed(otherUser);
        // await otherUser.addFollower(user);

        res.status(201).send({
          error: false,
          message: 'Data fetched successfully',
          data: { follow: true }
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
