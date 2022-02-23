import { isEmpty } from 'lodash';
import moment from 'moment';
const jwt = require('jsonwebtoken');
const ViewsModel = require('models/Views');
const VideoModel = require('models/Video');
const UserModel = require('models/User');
const handler = async (req, res) => {
  if (req.method === 'POST') {
    const {
      body,
      headers: { authorization }
    } = req;
    try {
      if (!authorization) {
        console.log('Please login');
        res.status(401).send({ error: true, data: [], message: 'Please Login' });
      }
      // getting the user id and name of the viewer
      const { username, id } = jwt.verify(authorization.split(' ')[1], process.env.SECRET_KEY);

      if (!body) {
        return res.status(400).send({ error: true, data: [], message: 'No data passed to server' });
      }
      /**
       * getting the video id of the played video
       * TODO: it can be improvised by getting old views from get request in frontend and sending those views in here which will remove Video.find method and improves performance
       * ? oldViews
       */
      const { VideoId } = body;

      const view = await ViewsModel.findOne({
        where: { VideoId, UserId: id }
      });
      const video = await VideoModel.findOne({
        where: {
          id: VideoId
        }
      });
      const User = await UserModel.findOne({
        where: {
          id:video.UserId
        }
      });
      if (view === null) {
        await ViewsModel.create({
          VideoId,
          UserId: id
        });
        const newVideo = await VideoModel.update(
          {
            views: Number(video.views) + 1
          },
          {
            where: {
              id: VideoId
            }
          }
        );
        await UserModel.update(
          {
            totalViews: User.totalViews + 1
          },
          {
            where: {
              id:video.UserId
            }
          }
        );
        res.status(201).json({
          error: false,
          message: 'View Given Succesfully',
          data: []
        });
      } else {
        const nowDate = moment();
        let viewDate = moment(view.createdAt);
        /**
         * difference should be at least one day
         * TODO:change condition to to (>=1)
         */
        if (Number(nowDate.diff(viewDate, 'days')) >= 1) {
          
          await ViewsModel.create({
            VideoId,
            UserId: id
          });
          
          const newVideo = await VideoModel.update(
          
            {
              views: Number(video.views) + 1
            },
              {
              where: {
                id: VideoId
              }
            },
          );
          await UserModel.update({
            totalViews: User.totalViews + 1
          },
          {
            where:{
              id:video.UserId
            }
          });
          res.status(201).json({
            error: false,
            message: 'View Given Succesfully',
            data: []
          });
        } else {
          return res.status(201).send({ error: true, data: [], message: 'No Views Count' });
        }
      }
    } catch (error) {
      console.log('View Api Failed, Error:', error.message);
      res.status(500).send({
        error: true,
        message: error.message,
        data: []
      });
    }
  }
  // else if (req.method==="GET"){
  //   try {
  //     Views.create({
  //       VideoId:'90',
  //       UserId:'20'
  //     })
  //     console.log("temporary view created");
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }
};
export default handler;
