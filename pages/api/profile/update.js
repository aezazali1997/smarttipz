const jwt = require('jsonwebtoken');
const User = require('../../../models/User');
const bcrypt = require('bcryptjs');

const handler = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      throw new Error('Please Login');
    }
    const { username } = jwt.verify(
      req.headers.authorization.split(' ')[1],
      process.env.SECRET_KEY
    );

    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new Error('Please Login');
    }
    console.log('before')
    if (req.body.accountType !== 'Business') {
      let updateobj = req.body.data;
      if (req.body.data.password) {
        const encpass = await bcrypt.hash(req.body.data.password, 12);
        updateobj.password = encpass;
      }
      await user.update(updateobj);
    } else {
      await user.update(req.body.data);
      const business = await user.getBusiness();
      if (req.body.businessCard.website) {
        business.link = req.body.businessCard.website;
        business.save();
      }
      const businessCard = await business.getBusinessCard();
      if (businessCard) await businessCard.update(req.body.businessCard);
    }
    res.status(200).json({ message: 'Updated successfully' });
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};

export default handler;
