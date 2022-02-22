

const sequelize = require('models/db');


const Video = require('models/Video');


const handler = async (req, res) => {
   const videos=await Video.destroy({
      where :{
        UserId:'1',
        isApproved:false
      }
    })
    // res.send(videos)
    res.status(200).send({ message: 'deleted videos succesfully' });
}
export default handler;