import BankDetail from 'models/BankDetail';
const jwt = require('jsonwebtoken');
const User = require('models/User');
const { AUTH, REQUEST, API } = require('src/pages/api/consts');

const handler = async (req, res) => {
  if (req.method === REQUEST.POST) {
    if (!req.headers.authorization) {
      return res.status(401).send({
        error: true,
        message: AUTH.NOT_LOGGED_IN,
        data: {}
      });
    }
    const { username } = jwt.verify(req.headers.authorization.split('')[1], process.env.SECRET_KEY);

    const { id: userId } = User.findOne({
      where: {
        username
      }
    });

    if (!userId) {
      return res.status(404).send({
        error: false,
        data: {},
        message: AUTH.USER_NOT_FOUND
      });
    }

    if (!req.body) {
      return res.status(400).send({
        error: true,
        message: AUTH.NO_BODY,
        data: {}
      });
    }
    const { id, accountTitle, IBAN } = req.body;
    try {
      const user = await BankDetail.find({
        where: {
          UserId: id
        }
      });
      if (user) {
        await BankDetail.update(
          {
            accountTitle: accountTitle,
            iban: IBAN
          },
          {
            where: {
              UserId: id
            }
          }
        );
        res.status(201).json({
          erorr: false,
          message: API.SUCCESS,
          data: []
        });
      } else {
        await BankDetail.create({
          UserId: id,
          accountTitle,
          iban: IBAN
        });
        res.status(201).json({
          erorr: false,
          message: API.SUCCESS,
          data: []
        });
      }
    } catch (error) {
      res.status(404).send({
        error: true,
        message: API.ERROR,
        data: {}
      });
    }
  } else if (req.method === REQUEST.GET) {
    if (!req.headers.authorization) {
      return res.status(401).send({
        error: true,
        message: AUTH.NOT_LOGGED_IN,
        data: {}
      });
    }
    const { username } = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY);

    const { id: userId } = await User.findOne({
      where: {
        username: username
      }
    });

    if (!userId) {
      return res.status(404).send({
        error: false,
        data: {},
        message: AUTH.USER_NOT_FOUND
      });
    }
    try {
      const bankDetails = await BankDetail.find({
        where: {
          UserId: userId
        }
      });
      if (bankDetails) {
        res.status(200).json({
          error: false,
          message: API.SUCCESS,
          data: {
            accountTitle: bankDetails.accountTitle,
            IBAN: bankDetails.iban
          }
        });
      } else {
        res.status(200).json({
          error: false,
          message: API.NO_DATA,
          data: {}
        });
      }
    } catch (error) {
      return res.status(500).send({
        error: true,
        message: API.ERROR,
        data: {}
      });
    }
  } else {
    res.status(404).send({
      error: true,
      message: API.NO_PAGE,
      data: {}
    });
  }
};
export default handler;
