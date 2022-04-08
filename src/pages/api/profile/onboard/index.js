const User = require('models/User');
const jwt = require('jsonwebtoken');
const { API, AUTH, REQUEST } = require('src/pages/api/consts');
const stripe = require('stripe')(process.env.STRIPE_SK);
import Cors from 'cors';
import initMiddleware from 'utils/init-middleWare';
const handler = async (req, res) => {
  const cors = initMiddleware(
    Cors({
      methods: ['GET', 'POST', 'OPTIONS', 'UPDATE'],
      origin: ['https://m.stripe.com/', 'https://pay.google.com']
    })
  );
  await cors(req, res);

  if (req.method === REQUEST.POST) {
    console.log('inside post', req.headers);
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(401).send({ error: true, data: [], message: AUTH.NOT_LOGGED_IN });
      }

      const { username } = jwt.verify(authorization.split(' ')[1], process.env.SECRET_KEY);

      const { id: userId, stripeAccountId } = await User.findOne({
        where: { username }
      });

      if (!userId) {
        return res.status(400).send({
          error: false,
          message: AUTH.NO_USER_FOUND,
          data: {}
        });
      }
      const accountLink = await stripe.accountLinks.create({
        account: stripeAccountId,
        refresh_url: `${process.env.NEXT_PUBLIC_BASE_URL}dashboard/setting`,
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}dashboard/setting`,
        type: 'account_onboarding'
      });

      res.status(201).send({
        error: false,
        message: API.SUCCESS,
        data: {
          accountLink
        }
      });
    } catch (error) {
      res.status(500).send({
        error: false,
        message: ` ${API.ERROR}:${error.message}`,
        data: {}
      });
    }
  } else {
    res.status(404).send(API.NO_PAGE);
  }
};
export default handler;
