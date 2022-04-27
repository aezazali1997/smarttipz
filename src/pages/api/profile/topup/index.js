const User = require('models/User');
const jwt = require('jsonwebtoken');
const { API, AUTH, REQUEST } = require('src/pages/api/consts');
import Cors from 'cors';
import initMiddleware from 'utils/init-middleWare';
import SendEmail from 'utils/sendMail';
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
    return res.status(401).send({ error: true, data: [], message: AUTH.NOT_LOGGED_IN });
  }

  const { username } = jwt.verify(authorization.split(' ')[1], process.env.SECRET_KEY);

  const { id: userId, email } = await User.findOne({
    where: { username }
  });

  if (!userId) {
    return res.status(400).send({
      error: false,
      message: AUTH.NO_USER_FOUND,
      data: {}
    });
  }

  if (req.method === REQUEST.POST) {
    if (!req.body) {
      res.status(400).send({
        error: true,
        data: [],
        message: AUTH.NO_BODY
      });
    }
    const { topUp } = req.body;
    try {
      let user = await User.find({
        where: {
          email
        }
      });
      const totalAmount = user.totalTipsAmount;

      await User.update(
        {
          totalTipsAmount: Number(totalAmount) + Number(topUp)
        },
        {
          where: {
            email
          }
        }
      );

      const { success, message } = await SendEmail(
        email,
        'Smarttipz topup alert!',
        `You have just added $ ${topUp} in your SmartTipz Wallet through top up`,
        'd-caa714cc6b6c457fabe283e81c817b25'
      );
      if (!success) return res.status(400).json({ error: true, message: message, data: [] });

      res.status(201).send({
        error: false,
        message: API.SUCCESS,
        totalTipsAmount: Number(totalAmount) + Number(topUp)
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
