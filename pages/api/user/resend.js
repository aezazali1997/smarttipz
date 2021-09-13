const randomString = require('randomstring');

const User = require('../../../models/User');
const Joi = require('joi');
const sendEmail = require('../../../utils/sendMail');

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const validateResend = (data) => {
      const schema = Joi.object({
        email: Joi.string().required()
      });
      return schema.validate(data);
    };

    const { error } = validateResend(req.body);

    if (error) return res.status(400).json({ error: error.details[0].message });

    const { email } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error('No user found');
      }
      let verificationCode = randomString.generate({
        length: 6,
        charset: 'numeric'
      });

      await user.update({ varificationCode: verificationCode });

      console.log('VerifyCode: ', verificationCode);
      sendEmail(
        user.email,
        'Account Varification',
        `<p>Your account validation code is: ${verificationCode}</p>`
      );

      res.status(200).json({ error: false, message: 'Varification code sent', data: [] });
    } catch (err) {
      res.status(400).json({ error: true, message: err.message, data: [] });
    }
  } else {
    res.status(404).end('Page Not Found');
  }
};

export default handler;
