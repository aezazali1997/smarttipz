const Notification = require('models/Notification');
const Entity = require('models/Entity');
const AllPost = require('models/AllPost');
const jwt = require('jsonwebtoken');
const { API, AUTH, REQUEST } = require('src/pages/api/consts');
const User = require('models/User');
const handler = async (req, res) => {
  if (req.method === REQUEST.GET) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).send({
        error: true,
        message: AUTH.NOT_LOGGED_IN,
        data: []
      });

      const { username } = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY);
    }
    const user = await User.findOne({
      where: {
        username
      }
    });
    if (!user) {
      res.status(404).send({
        error: false,
        message: AUTH.NO_USER_FOUND,
        data: {}
      });
    }

    try {
      // get all the noridications of the current logged in user
      
      // get all notifications

        const notifications = await Notification.findAll({
          where:{
            
          }
        })
      // sort them reversely
      
      // get the actors User data
      
      // allPosts Data along with video
      
      // paste them on frontend
      
      
      
      
      
      // divide the notifications into pagination with 5 on each view
      // 



    } catch (error) {
      return res.status(404).send();
    }
  }
};
module.exports = handler;
