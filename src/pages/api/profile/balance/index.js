const User = require('models/User');

const handler = async(req,res )=>{
if (!req.headers.authorization) {
    return res.status(401).send({ error: true, data: [], message: 'Please Login' });
  }
  if(req.method==='GET'){
    
    
    const {query:{id}}=req


    try {
      const user= await User.find({
        where:{
          id
        }
      });
      console.log('user ',user)
      res.status(200).send({
        error:false,
        message:'balance found',
        balance:Number(user.totalTipsAmount),
      })
    } catch (error) {
       res.status(500).send({
        error:true,
        message:error.message,
        data:[]
       })
    }
  }
}
module.exports=handler;