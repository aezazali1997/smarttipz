const User = require('models/User');
const jwt = require('jsonwebtoken');
const handler = async(req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ error: true, data: [], message: 'Please Login' });
  }
  if (!req.body) {
    res.status(400).send({
      error: true,
      data: [],
      message: 'No body defined'
    });
  }

    if (req.method === 'POST') {
      const {
        topUp,email
      }=req.body
    
    let user= await User.find({
      where:{
        email
      }
    })
    const totalAmount = user.totalTipsAmount; 
    
    await User.update({
      totalTipsAmount:Number(totalAmount)+Number(topUp)
    },
    {
      where:{
        email
      }
    }
    )
    res.status(201).send({
      error:false,
      message:'Top up updated succes',
      totalTipsAmount:Number(totalAmount)+Number(topUp)
    })

  }
};
export default handler;
