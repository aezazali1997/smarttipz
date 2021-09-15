const bcrypt = require('bcryptjs');
const randomString = require('randomstring');
const User = require('../../../models/User');
const Business = require('../../../models/Business');
const Session = require('../../../models/Session');
const sendEmail = require('../../../utils/sendMail');
const jwt = require('jsonwebtoken');

const Joi = require('joi');

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const validateSignup = (data) => {
      const schema = Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required(),
        email: Joi.string().required().email(),
        phone: Joi.string().allow(null).allow('').optional(),
        password: Joi.string().required(),
        accountType: Joi.string().required(),
        website: Joi.any().when('accountType', {
          is: 'Business',
          then: Joi.string().required().uri(),
          otherwise: Joi.string().allow(null).allow('').optional().uri()
        })
      });
      return schema.validate(data);
    };

    const { error } = validateSignup(req.body);

    if (error) return res.status(400).json({ error: error.details[0].message });

    const { username, email, phone, password, accountType, website, name } = req.body;
    console.log('Signup:', req.body);

    let user = null;

    try {
      user = await User.findOne({ where: { username } });
      if (user) {
        throw new Error('Username already exists');
      }

      user = await User.findOne({ where: { email } });
      if (user) {
        throw new Error('Email already in use');
      }

      const encPassword = await bcrypt.hash(password, 12);
      let varificationCode = randomString.generate({
        length: 6,
        charset: 'numeric'
      });

      console.log('varifyCode:', varificationCode);

      const newUser = await User.create({
        name,
        username,
        email,
        phoneNumber: phone,
        password: encPassword,
        accountType,
        varificationCode: varificationCode
      });

      if (accountType === 'Business') {
        const newBusiness = await Business.create({
          link: website
        });
        await newUser.setBusiness(newBusiness);
      }

      await Session.create({
        userId: newUser.id,
        username: newUser.username,
        connected: false
      });

      await sendEmail(
        email,
        'Account Authentication',
        `<p>Your account validation code is: ${varificationCode}</p>`
      );

      const token = jwt.sign({ email: newUser.email }, process.env.SECRET_KEY);

      res.status(201).json({ error: false, data: { OTPToken: token }, message: 'User successfuly signed up.' });
    } catch (err) {
      res.status(422).json({ error: true, message: err.message, data: [] });
    }
  } else {
    res.status(404).end('Page Not Found');
  }
};

export default handler;
