import Cors from 'cors';
const User = require('models/User');
const jwt = require('jsonwebtoken');

import initMiddleWare from 'utils/init-middleWare';
const stripe = require('stripe')(process.env.STRIPE_SK);
const { API, AUTH, REQUEST } = require('src/pages/api/consts');
const handler = async (req, res) => {
  const cors = initMiddleWare(
    Cors({
      methods: ['GET', 'POST', 'UPDATE'],
      origin: ['https://stripe.com', 'https://pay.google.com']
    })
  );

  await cors(req, res);

  // if (req.method === REQUEST.POST) {
  //   console.log('hello', req.headers);
  //   const { authorization } = req.headers;
  //   if (!authorization) {
  //     return res.status(401).send({
  //       error: true,
  //       message: AUTH.NOT_LOGGED_IN,
  //       data: {}
  //     });
  //   }
  //   let { username } = jwt.verify(authorization.split(' ')[1], process.env.SECRET_KEY);
  //   const { id: userId } = await User.findOne({
  //     where: { username }
  //   });
  //   if (!userId) {
  //     return res.status(400).send({
  //       error: false,
  //       message: AUTH.NO_USER_FOUND,
  //       data: {}
  //     });
  //   }
  let { amount } = req.body;
  console.log('amount', amount);
  let paymentIntent = null;

  try {
    paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount * 100),
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true
      }
    });
    res.status(200).send({
      error: false,
      message: API.SUCCESS,
      data: {
        client_secret: paymentIntent.client_secret
      }
    });
  } catch (err) {
    res.status(500).send({ error: true, message: `${API.ERROR}:${err.message}`, data: {} });
  }

  // } else {
  //   res.status(404).send(API.NO_PAGE);
  // }
};
module.exports = handler;
