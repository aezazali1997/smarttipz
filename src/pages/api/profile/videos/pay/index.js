const Video = require('models/Video');
const User = require('models/User');
const Admin = require('models/Admin');
const Pay = require('models/Pay');
const handler = async (req, res) => {
  if (!req.headers.authorization) {
    res.status(401).send({
      error: true,
      data: [],
      message: 'Please Login'
    });
  }

  if (!req.body) {
    res.status(400).send({
      error: true,
      data: [],
      message: 'No body defined'
    });
  }

  if (req.method === 'POST') {
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

      res.status(201).send({
        error: false,
        message: 'reciedved payment',
        balance:  Number(userSender.totalTipsAmount) - Number(paid)
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        data: [],
        message: 'API Failed'
      });
    }
  }
};
export default handler;
