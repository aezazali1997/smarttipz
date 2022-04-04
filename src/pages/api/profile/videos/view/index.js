const moment = require('moment');
const jwt = require('jsonwebtoken');
const ViewsModel = require('models/Views');
const VideoModel = require('models/Video');
const UserModel = require('models/User');
const { API, AUTH, REQUEST } = require('src/pages/api/consts');

const handler = async (req, res) => {
  if (req.method === REQUEST.POST) {
    const {
      body,
      headers: { authorization }
    } = req;
    try {
      if (!authorization) {
        res.status(401).send({ error: true, data: [], message: AUTH.NOT_LOGGED_IN });
      }
      // getting the user id and name of the viewer
      const { username, id } = jwt.verify(authorization.split(' ')[1], process.env.SECRET_KEY);

      if (!body) {
        return res.status(400).send({ error: true, data: [], message: AUTH.NO_BODY });
      }
      /**
       * ? oldViews
       * TODO: it can be improvised by getting old views from get request in frontend and sending those views in here which will remove Video.find method and improves performance
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
          id: video.UserId
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
              id: video.UserId
            }
          }
        );
        res.status(201).json({
          error: false,
          message: API.SUCCESS,
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
            }
          );
          await UserModel.update(
            {
              totalViews: User.totalViews + 1
            },
            {
              where: {
                id: video.UserId
              }
            }
          );
          res.status(201).json({
            error: false,
            message: API.SUCCESS,
            data: []
          });
        } else {
          return res.status(201).send({ error: true, data: [], message: API.NO_SUCCESS });
        }
      }
    } catch (error) {
      console.log('View Api Failed, Error:', error.message);
      res.status(500).send({
        error: true,
        message: `${API.ERROR}:${error.message}`,
        data: []
      });
    }
  }
  else{
    res.status(404).send(API.NO_PAGE)
  }

};
export default handler;
