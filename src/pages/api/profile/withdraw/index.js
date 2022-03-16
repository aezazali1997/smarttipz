const User = require('models/User');
const BankDetail = require('models/BankDetail');
const WithDrawRequest = require('models/WithDrawRequest');
const jwt = require('jsonwebtoken');
const handler = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ error: true, data: [], message: 'Please Login' });
  }
  if (req.method === 'POST') {
    if (!req.body) {
      res.status(400).send({
        error: true,
        data: [],
        message: 'No body defined'
      });
    }
    const { withDraw, email } = req.body;

    let user = await User.find({
      where: {
        email
      }
    });
    const bankInfo = await BankDetail.find({
      where:{
        UserId:user.id
      }
    })
    await WithDrawRequest.create({
      BankDetailId:bankInfo.id,
      UserId:user.id,
      amount:withDraw
    })
    
    const totalAmount = user.totalTipsAmount;
    await User.update(
      {
        totalTipsAmount: Number(totalAmount) - Number(withDraw)
      },
      {
        where: {
          email
        }
      }
    );
    res.status(201).send({
      error: false,
      message: 'withdraw updated succes',
      totalTipsAmount:Number(totalAmount) - Number(withDraw)
    });
  }
};
export default handler;
