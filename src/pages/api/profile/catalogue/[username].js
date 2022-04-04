const { isEmpty } = require('lodash');
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');
const db = require('models/db');
const AllPosts = require('models/AllPost');
const PostLikee = require('models/Like');
const Share = require('models/Share');
const Video = require('models/Video');
const User = require('models/User');
const { API, AUTH, REQUEST } = require('src/pages/api/consts');
const handler = async (req, res) => {
  if (req.method === REQUEST.GET) {
    const {
      query: { username },
      headers: { authorization }
    } = req;
    try {
      if (!authorization) {
        return res.status(401).send({ error: true, data: [], message: AUTH.NOT_LOGGED_IN });
      }
      const result = jwt.verify(authorization.split(' ')[1], process.env.SECRET_KEY);

      const user = await User.findOne({
        attributes: ['id'],
        where: { username }
      });
      if (!user) {
        return res.status(404).send({ error: true, data: [], message: AUTH.NO_USER_FOUND });
      }

      // console.log('user: ', user);
      const { id, id: userId } = user;

      const videos = await AllPosts.findAll({
        include: [
          {
            model: Video,
            include: [
              {
                model: User,
                attributes: ['name', 'username', 'picture', 'tip']
              }
            ]
          },
          {
            model: Share,
            attributes: ['id', 'caption']
          }
        ],
        where: {
          [sequelize.Op.and]: [
            {
              '$Video.isApproved$': {
                [sequelize.Op.eq]: true
              }
            },
            {
              '$Video.UserId$': {
                [sequelize.Op.eq]: id
              }
            },
            {
              '$Video.catalogue$': {
                [sequelize.Op.eq]: true
              }
            },
            {
              isShared: {
                [sequelize.Op.eq]: false
              }
            }
          ]
        },
        group: [
          'AllPost.id',
          'Video.id',
          'Video->User.id',
          'Video->User.name',
          'Video->User.username',
          'Video->User.picture',
          'Share.id'
        ],
        order: [['createdAt', 'DESC']]
      });

      for (let i = 0; i < videos.length; i++) {
        const item = videos[i];
        const { id, VideoId, Video, Share: Shares, isShared, likeCount, commentCount } = item;
        // const likeCount = await PostLikee.count({
        //     where: {
        //         AllPostId: id
        //     }
        // });
        const isLiked = await PostLikee.find({
          where: {
            AllPostId: id,
            reviewerId: userId
          }
        });

        let shareCount = Video.shareCount;
        const ratings =
          await db.query(`select avg(r."rating") as "avgRating", count(r."AllPostId") as "totalRaters" from "AllPosts" p
						left join "Ratings" as r on p.id=r."AllPostId"
						where (p.id=${id} and r."AllPostId"=${id})
						group by p.id`);

        const avgRating = isEmpty(ratings[0]) ? 0 : ratings[0][0].avgRating;
        const totalRaters = isEmpty(ratings[0]) ? 0 : ratings[0][0].totalRaters;

        videos[i] = {
          id,
          VideoId,
          avgRating,
          avgRating,
          totalRaters,
          isShared,
          Video,
          Share: Shares,
          likeCount,
          shareCount,
          commentCount,
          isLiked: isLiked ? true : false
        };
      }

      res.status(200).json({
        error: false,
        message: API.SUCCESS,
        data: { catalogues: videos }
      });
    } catch (err) {
      res.status(500).send({ error: true, data: [], message: `${API.ERROR}:${err.message}` });
    }
  } else {
    res.status(404).end(API.NO_PAGE);
  }
};

export default handler;
