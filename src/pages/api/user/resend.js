const randomString = require('randomstring');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const User = require('models/User');
const sendEmail = require('utils/sendMail');

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const validateResend = (data) => {
      const schema = Joi.object({
        email: Joi.string().email().optional().allow(null).allow(''),
        Token: Joi.string().optional().allow(null).allow('')
      });
      return schema.validate(data);
    };

    const { error } = validateResend(req.body);

    if (error) return res.status(400).json({ error: error.details[0].message });

    const { email, Token } = req.body;

    let userEmail = '';

    try {
      if (Token && Token !== '') {
        console.log('hasToken')
        const { email } = jwt.verify(
          Token,
          process.env.SECRET_KEY
        );
        userEmail = email;
      } else {
        console.log('noToken')
        userEmail = email;
      }

      const user = await User.findOne({ where: { email: userEmail } });
      if (!user) {
        res.status(404).json({ error: true, message: 'No user found', data: [] });
      }
      let verificationCode = randomString.generate({
        length: 6,
        charset: 'numeric'
      });

      await user.update({ varificationCode: verificationCode });

      console.log('VerifyCode: ', verificationCode);
      sendEmail(
        user.email,
        'Account Verification Code',
        `Your account validation code is: ${verificationCode}`,
        'd-2ade08cf167948cf8cc9b478d81afc7d'

      );

      const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY);

      res.status(200).json({ error: false, message: 'Varification code sent', data: { OTPToken: token } });
    } catch (err) {
      res.status(500).json({ error: true, message: err.message, data: [] });
    }
  } else {
    res.status(404).end('Page Not Found');
  }
};

export default handler;
