const stripe = require('stripe')(process.env.STRIPE_SK);
const jwt = require('jsonwebtoken');
const User = require('models/User');
const Charge = require('models/Charge');
import Cors from 'cors';
import initMiddleware from 'utils/init-middleWare';
const { API, AUTH, REQUEST } = require('src/pages/api/consts');
const handler = async (req, res) => {
  const cors = initMiddleware(
    Cors({
      methods: ['GET', 'POST', 'OPTIONS', 'UPDATE'],
      origin: ['https://m.stripe.com/', 'https://pay.google.com']
    })
  );
  await cors(req, res);
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send({
      error: true,
      message: AUTH.NOT_LOGGED_IN,
      data: []
    });
  }
  const { username } = jwt.verify(authorization.split(' ')[1], process.env.SECRET_KEY);

  const user = await User.findOne({
    attributes: ['id', 'email', 'username'],
    where: { username }
  });
  if (!user) {
    return res.status(404).send({ error: true, data: [], message: AUTH.NO_USER_FOUND });
  }

  if (!req.body) {
    res.status(400).send({
      error: true,
      message: AUTH.NO_BODY,
      data: []
    });
  }
  if (req.method === REQUEST.POST) {
    try {
      const { amount, token } = req.body;

      const { id, email, username } = user;
      const userEmail = email;
      const userName = username;

      const card = await Charge.findOne({
        where: {
          UserId: id
        }
      });
      console.log('card',card)
      const amountCal = (amount * 100).toString().split('.')[0];

      if (card) {
        const { cardId, customerId } = card;

        // const paymentIntent = await stripe.paymentIntents.create({
        //   amount: amountCal,
        //   currency: 'usd'
        // });

        const charge = await stripe.charges.create({
          amount: amountCal,
          currency: 'usd',
          description: 'Charging the customer For Smart tipz',
          source: cardId,
          receipt_email: email,
          customer: customerId
        });
      } else {
        const customer = await stripe.customers.create({
          description: 'Creating a customer for the SmartTipz User',
          email: userEmail,
          name: userName
        });

        const card = await stripe.customers.createSource(customer.id, { source: token });
        const charge = await stripe.charges.create({
          amount: amountCal,
          currency: 'usd',
          description: 'Charging the customer For Smart tipz',
          source: card.id,
          receipt_email: customer.email,
          customer: customer.id
        });

        const createChargeObj = await Charge.create({
          cardId: card.id,
          customerId: customer.id,
          UserId: id
        });
      }

      res.status(200).send({
        error: false,
        data: [],
        message: 'top up successfull'
      });
    } catch (error) {
      console.log('error', error.message);
      res.status(500).send(`POSt API failed :  ${error.message}`);
    }
  }
};
module.exports = handler;
