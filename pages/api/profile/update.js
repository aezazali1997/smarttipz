const jwt = require('jsonwebtoken');
const User = require('../../../models/User');
const bcrypt = require('bcryptjs');

const handler = async (req, res) => {

  const { body, headers } = req;
  try {
    if (!headers.authorization) {
      throw new Error('Please Login');
    }
    const { username } = jwt.verify(
      headers.authorization.split(' ')[1],
      process.env.SECRET_KEY
    );
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new Error('Please Login');
    }
    if (body.accountType !== 'Business') {
      let updateobj = body.data;
      if (body.data.password) {
        const encpass = await bcrypt.hash(body.data.password, 12);
        updateobj.password = encpass;
      }
      await user.update(updateobj);
    }
    else {
      await user.update(req.body.data);
      const business = await user.getBusiness();
      if (body.businessCard.website) {
        business.link = body.businessCard.website;
        business.save();
      }
      const businessCard = await business.getBusinessCard();
      if (businessCard) await businessCard.update(body.businessCard);
    }
    res.status(200).json({ message: 'Updated successfully' });
  } catch (err) {
    res.status(422).json({ error: true, message: err.message });
  }
};

export default handler;
