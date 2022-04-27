import AllPosts from 'models/AllPost';

const Video = require('models/Video');
const User = require('models/User');
const Admin = require('models/Admin');
const Pay = require('models/Pay');
const { API, AUTH, REQUEST } = require('src/pages/api/consts');
const sendEmail = require('utils/sendMail');
const handler = async (req, res) => {
  if (!req.headers.authorization) {
    res.status(401).send({
      error: true,
      data: [],
      message: AUTH.NOT_LOGGED_IN
    });
  }

  if (!req.body) {
    res.status(400).send({
      error: true,
      data: [],
      message: AUTH.NO_BODY
    });
  }

  if (req.method === REQUEST.POST) {
    const { senderId, receiverId, paid, videoId } = req.body;
    try {
      await Pay.create({
        userId: senderId,
        videoId
      });

      const userSender = await User.find({
        where: {
          id: senderId
        }
      });
      await User.update(
        {
          totalTipsAmount: Number(userSender.totalTipsAmount) - Number(paid)
        },
        {
          where: {
            id: senderId
          }
        }
      );

      const userReceiver = await User.find({
        where: {
          id: receiverId
        }
      });
      const platformFee = (Number(paid) * 1) / 100;
      await User.update(
        {
          totalTipsAmount: Number(userReceiver.totalTipsAmount) + (Number(paid) - platformFee)
        },
        {
          where: {
            id: receiverId
          }
        }
      );
      const admin = await Admin.find({
        where: {
          id: 4
        }
      });
      await Admin.update(
        {
          totalAmount: Number(admin.totalAmount) + Number(platformFee)
        },
        {
          where: {
            id: 4
          }
        }
      );
      const video = await Video.find({
        where: {
          id: videoId
        }
      });
      const AllPost = await AllPosts.find({
        where: {
          VideoId: videoId
        }
      });

      await Video.update(
        {
          tip: Number(video.tip) + Number(paid)
        },
        {
          where: {
            id: videoId
          }
        }
      );
      // send mail to user who recieved payment of their video

      // const { success, message } = await sendEmail(
      //   userReceiver.email,
      //   'You got a paid view for your video!',
      //   `You have received $ ${
      //     paid - platformFee
      //   } payment against your paid video http://smart-tipz.vercel.app/dashboard/videos/${AllPost.id}`,
      //   'd-316414ed5ee24b3bbef433e4a5eedf55'
      // );

      if (!success) return res.status(400).json({ error: true, message: message, data: [] });

      res.status(201).send({
        error: false,
        message: API.SUCCESS,
        balance: Number(userSender.totalTipsAmount) - Number(paid)
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        data: [],
        message: `${API.ERROR}:${error.message}`
      });
    }
  }
};
export default handler;
