import Favourite from 'models/Favourite';

const AllPosts = require('models/AllPost');
const Comments = require('models/Comments');
const PostLikee = require('models/Like');
const Shares = require('models/Share');
const db = require('models/db');
const jwt = require('jsonwebtoken');
const Users = require('models/User');
const Videos = require('models/Video');
const Pay = require('models/Pay');
const { isEmpty } = require('lodash');
const { API, AUTH, REQUEST } = require('src/pages/api/consts');

const handler = async (req, res) => {
  if (req.method === REQUEST.GET) {
    const {
      query: { id: videoId },
      headers: { authorization }
    } = req;
    try {
      if (!authorization) {
        return res.status(401).send({ error: true, data: [], message: AUTH.NOT_LOGGED_IN });
      }

      const { id: userId } = jwt.verify(authorization.split(' ')[1], process.env.SECRET_KEY);

      let video = await AllPosts.findOne({
        include: [
          {
            model: Videos,
            include: [
              {
                model: Users,
                attributes: ['name', 'username', 'picture', 'tip']
              }
            ]
          },
          {
            model: Shares,
            attributes: ['id', 'caption']
          }
        ],
        where: {
          id: videoId
        },
        group: [
          'AllPost.id',
          'Video.id',
          'Video->User.id',
          'Video->User.name',
          'Video->User.username',
          'Video->User.picture',
          'Share.id'
        ]
      });

      const result = await getStats(video, userId);

      res.status(200).send({
        message: API.SUCCESS,
        data: { video: result }
      });
    } catch (err) {
      console.log('Video Detail Api Failed: ', err.message);
      res.status(500).send({ error: true, data: [], message: `${API.ERROR}:${err.message}` });
    }
  } else {
    res.status(404).end(API.NO_PAGE);
  }
};

export default handler;

const getStats = async (video, userId) => {
  let tempData = JSON.parse(JSON.stringify(video));
  const { id, VideoId } = tempData;
  const likeCount = await PostLikee.count({
    where: {
      AllPostId: id
    }
  });
  const isLiked = await PostLikee.find({
    where: {
      AllPostId: id,
      reviewerId: userId
    }
  });
  const commentCount = await Comments.count({
    where: {
      AllPostId: id
    }
  });
  const shareCount = await Shares.count({
    where: {
      VideoId
    }
  });

  const isFavourite = await Favourite.findOne({
    where: {
      reviewerId: userId,
      VideoId: VideoId
    }
  });

  const ratings =
    await db.query(`select avg(r."rating") as "avgRating", count(r."AllPostId") as "totalRaters" from "AllPosts" p
						left join "Ratings" as r on p.id=r."AllPostId"
						where (p.id=${id} and r."AllPostId"=${id})
						group by p.id`);

  const avgRating = isEmpty(ratings[0]) ? 0 : ratings[0][0].avgRating;
  const totalRaters = isEmpty(ratings[0]) ? 0 : ratings[0][0].totalRaters;

  let paid = null;
  const { Video } = video;
  if (Video.videoCost === 'Paid') {
    paid = await Pay.findOne({
      where: {
        userId: userId,
        videoId: VideoId
      }
    });
  }

  const data = {
    ...tempData,
    avgRating,
    totalRaters,
    likeCount,
    commentCount,
    shareCount,
    isLiked: isLiked ? true : false,
    hasPaid: paid !== null ? true : false,
    isFavourite: isFavourite !== null ? true : false
  };
  return data;
};
