const Joi = require('joi');
const jwt = require('jsonwebtoken');
const User = require('models/User');

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const validateAuthenticate = (data) => {
      const schema = Joi.object({
        OTPToken: Joi.string().required(),
        varificationCode: Joi.string().required().length(6)
      });
      return schema.validate(data);
    };

    const { body } = req;

    const { error } = validateAuthenticate(body);

    if (error)
      return res.status(400).send({ error: true, data: [], message: error.details[0].message });

    const { varificationCode, OTPToken } = body;

    // console.log(body);

    try {

      const { email } = jwt.verify(OTPToken, process.env.SECRET_KEY);

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ error: true, message: 'Validation failed', data: [] });
      }

      const token = jwt.sign({ username: user.username, id: user.id }, process.env.SECRET_KEY);

      const time = Math.floor((Date.now() - user.updatedAt.getTime()) / (1000 * 60));
      if (time >= 60) {
        return res.status(403).json({ error: true, data: [], message: 'Validation code expired' });
      }

      if (!(user.varificationCode === varificationCode.toString())) {
        return res.status(400).json({ error: true, message: 'Validation failed', data: [] });
      }

      await user.update({ emailConfirmed: true });

      const { id, picture } = user;

      res
        .status(200)
        .json({
          error: false,
          data: { id, username: user.username, image: picture, token },
          message: 'User verified'
        });
    } catch (err) {
      res.status(500).send({ error: false, data: [], message: 'API Failed' });
    }
  } else {
    res.status(404).end('Page Not Found');
  }
};

export default handler;
