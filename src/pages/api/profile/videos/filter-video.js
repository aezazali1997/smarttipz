const PostLikee = require('models/Like');
const User = require('models/User');
const VideoModel = require('models/Video');
const jwt = require('jsonwebtoken');
const db = require('models/db');
const { isEmpty } = require('lodash');
const AllPosts = require('models/AllPost');
const Share = require('models/Share');
const { FilterSearchContent } = require('utils/consts');
const { API, AUTH, REQUEST } = require('src/pages/api/consts');
const handler = async (req, res) => {
  if (req.method === REQUEST.POST) {
    const {
      body: { videoType, videoCategory, accountType },
      headers: { authorization },
      query: { search, sort, category, rating }
    } = req;
    try {
      if (!authorization) {
        return res.status(401).send({ error: true, data: [], message: AUTH.NOT_LOGGED_IN });
      }
      const { username } = jwt.verify(authorization.split(' ')[1], process.env.SECRET_KEY);

      const { id: userId } = await User.findOne({
        attributes: ['id'],
        where: { username, isDeleted: false, isBlocked: false }
      });

      if (!userId) {
        return res.status(404).send({
          error: false,
          data: {},
          message: AUTH.NO_USER_FOUND
        });
      }

      const ArrayOfFollowedPeopleId = [];
      ArrayOfFollowedPeopleId.push(userId);

      const followers = await db.query(
        `select "followingId" as "followers" from "following" f where "followedId"=${userId}`
      );

      followers && followers[0].map(({ followers }) => ArrayOfFollowedPeopleId.push(followers));

      // console.log('ArrayOfFollowedPeopleId', ArrayOfFollowedPeopleId);

      const videos = await AllPosts.findOne({
        include: [
          {
            model: VideoModel,
            include: [
              {
                model: User,
                attributes: ['name', 'username', 'picture', 'tip']
              }
            ]
          },
          {
            model: Share,
            attributes: ['id', 'caption', 'createdAt'],
            include: [
              {
                model: User,
                attributes: ['id', 'username', 'picture', 'accountType', 'name', 'showName', 'showUsername']
              }
            ]
          }
        ],
        where: FilterSearchContent(
          search,
          category,
          videoType,
          videoCategory,
          accountType,
          ArrayOfFollowedPeopleId,
          rating
        ),
        group: [
          'AllPost.id',
          'Video.id',
          'Video->User.id',
          'Video->User.name',
          'Video->User.username',
          'Video->User.picture',
          'Share.id',
          'Share->User.id',
          'Share->User.username',
          'Share->User.picture',
          'Share->User.accountType',
          'Share->User.name',
          'Share->User.showName',
          'Share->User.showUsername'
        ],
        order: [['createdAt', sort]]
      });

      if (!videos) {
        return res.status(400).send({ error: true, data: [], message: API.NO_SUCCESS });
      }
      const item = videos;
      const { id, VideoId, Video, Share: Shares, isShared, likeCount, commentCount } = item;
      // const likeCount = await PostLikee.count({
      //     where: {
      //         AllPostId: id
      //     }
      // });
      // console.log("video ",video)
      const isLiked = await PostLikee.find({
        where: {
          AllPostId: id,
          reviewerId: userId
        }
      });
      // const commentCount = await Comments.count({
      //     where: {
      //         AllPostId: id,
      //     }
      // });
      // const videoShareCount = await Video.findOne({
      //   where: {
      //     id: VideoId
      //   },
      //   attributes: ['shareCount']
      // });
      let shareCount = Video.shareCount;
      // console.log("is liked",isLiked);
      // console.log("share count",shareCount);
      // const shareCount = await Share.count({
      //   where: {
      //     VideoId
      //   }
      // });
      const ratings =
        await db.query(`select avg(r."rating") as "avgRating", count(r."AllPostId") as "totalRaters" from "AllPosts" p
						left join "Ratings" as r on p.id=r."AllPostId"
						where (p.id=${id} and r."AllPostId"=${id})
						group by p.id`);

      const avgRating = isEmpty(ratings[0]) ? 0 : ratings[0][0].avgRating;
      const totalRaters = isEmpty(ratings[0]) ? 0 : ratings[0][0].totalRaters;

      let VIDEOS = {
        id,
        VideoId,
        totalRaters,
        avgRating,
        isShared,
        Video,
        Share: Shares,
        likeCount,
        shareCount,
        commentCount,
        isLiked: isLiked ? true : false
      };

      res.status(200).json({
        error: false,
        message: API.SUCCESS,
        data: { videos: VIDEOS }
      });
    } catch (err) {
      console.log('Videos Api Failed Error: ', err.message);
      res.status(500).send({ error: true, data: [], message: `${API.ERROR}:${err.message}` });
    }
  } else {
    res.status(404).end(API.NO_PAGE);
  }
};

export default handler;
