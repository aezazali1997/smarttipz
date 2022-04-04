const Video = require('models/Video');
const User = require('models/User');
const Admin = require('models/Admin');
const Tip = require('models/TipTransaction');
const { API, AUTH, REQUEST } = require('src/pages/api/consts');
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
    const { sender, reciever: receiver, tip, video: videoId } = req.body;
    try {
      const senderUser = await User.findOne({
        where: {
          id: sender
        }
      });

      let platformFee = (Number(tip) * 1) / 100;
      const admin = await Admin.findOne({
        where: {
          id: 4
        }
      });
      const receiverUser = await User.findOne({
        where: {
          id: receiver
        }
      });

      // make a transaction table object
      await Tip.create({
        senderId: sender,
        tip,
        senderPreviousTotal: senderUser.totalTipsAmount,
        receiverId: receiver,
        received: Number(tip) - platformFee,
        receiverpreviousTotal: receiverUser.totalTipsAmount,
        adminReceived: platformFee,
        adminPreviousTotal: admin.totalAmount,
        videoId
      });

      // update the sender ammount
      await User.update(
        {
          totalTipsAmount: Number(senderUser.totalTipsAmount) - Number(tip)
        },
        {
          where: {
            id: sender
          }
        }
      );
      // update the receiver amount
      await User.update(
        {
          totalTipsAmount: Number(receiverUser.totalTipsAmount) + (Number(tip) - platformFee)
        },
        {
          where: {
            id: receiver
          }
        }
      );
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

      const video = await Video.findOne({
        where: {
          id: videoId
        }
      });
      await Video.update(
        {
          tip: Number(tip) + Number(video.tip)
        },
        {
          where: {
            id: videoId
          }
        }
      );

      res.status(201).send({
        error: false,
        message: API.SUCCESS,
        balance: Number(senderUser.totalTipsAmount) - Number(tip)
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
