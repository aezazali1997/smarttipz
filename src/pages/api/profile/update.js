import { isEmpty } from 'lodash';
const jwt = require('jsonwebtoken');
const User = require('models/User');

const handler = async (req, res) => {
  if (req.method === 'POST') {

    const {
      body,
      body: { data, businessCard },
      headers
    } = req;

    try {
      if (!headers.authorization) {
        return res.status(401).send({ error: true, data: [], message: 'Please Login' })
      }

      const { username } = jwt.verify(
        headers.authorization.split(' ')[1],
        process.env.SECRET_KEY
      );

      if (isEmpty(body)) {
        return res.status(404).send({ error: true, data: [], message: 'No data passed to server' })
      }

      const { about, name, email, accessible, accountType, phone, picture, views, rating, showPhone,
        showUsername, showName, tip } = data

      const user = await User.findOne({ where: { username } });

      if (isEmpty(user)) {
        return res.status(404).send({ error: true, data: [], message: 'No user found' })
      }

      await user.update({
        name,
        username,
        email,
        avgRating: rating,
        totalViews: views,
        about,
        picture,
        phoneNumber: phone,
        showPhone,
        showUsername,
        showName,
        accessible,
        accountType,
        tip
      });

      if (accountType === 'Business') {
        const business = await user.getBusiness();
        if (businessCard.website) {
          business.link = businessCard.website;
          business.save();
        }
        const card = await business.getBusinessCard();
        if (card) await card.update(businessCard);
      }
      res.status(200).json({ message: 'Updated successfully' });
    } catch (err) {
      res.status(500).json({ error: true, message: err.message });
    }
  }
  else {
    res.status(404).send({ message: 'API Not Found' })
  }
};

export default handler;
