import BankDetail from 'models/BankDetail';
import BankDetails from 'src/pages/dashboard/components/BankDetails';

const User = require('models/User');
const handler = async (req, res) => {
  if (!req.headers.authorization) {
    res.status(401).json({
      error: true,
      message: 'Not Authorized',
      data: []
    });
  }

  try {
    if (req.method === 'POST') {
      if (!req.body) {
        res.status(403).json({
          error: true,
          message: 'no body defined',
          data: []
        });
      }
      const { id, accountTitle, IBAN } = req.body;
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
          message: 'Bank Account Details Updated',
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
          message: 'Bank Account Detail Saved',
          data: []
        });
      }
    } else if (req.method === 'GET') {
      const { userId } = req.query;
      const bankDetails = await BankDetail.find({
        where: {
          UserId: userId
        }
      });
      if(bankDetails){
        res.status(200).json({
        error: false,
        message: 'data found',
        data: {
          accountTitle: bankDetails.accountTitle,
          IBAN: bankDetails.iban
        }
      });
      }
      else{
        res.status(200).json({
        error: false,
        message: 'No data found',
        data: {}
      });
      }
          }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `Bank Detail API failed ${error.message}`,
      data: []
    });
  }
};
export default handler;
