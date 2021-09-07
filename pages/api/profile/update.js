const jwt = require('jsonwebtoken');
const User = require('../../../models/User');
const bcrypt = require('bcryptjs');

const handler = async (req, res) => {

  const {
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

    const { about, name, email, accessible, accountType, phone, picture, views, rating, showPhone } = data

    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new Error('Please Login');
    }
    if (accountType !== 'Business') {
      if (data.password) {
        const encpass = await bcrypt.hash(data.password, 12);
        data.password = encpass;
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
        accessible,
        accountType
      });
    }
    else {
      console.log("data: ", data);
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
        accessible,
        accountType
      });
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
};

export default handler;
