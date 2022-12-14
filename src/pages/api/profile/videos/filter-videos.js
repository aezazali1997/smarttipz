import Favourite from 'models/Favourite';

const PostLikee = require('models/Like');
const User = require('models/User');
const Video = require('models/Video');
const jwt = require('jsonwebtoken');
const db = require('models/db');
const Pay = require('models/Pay');
const { isEmpty } = require('lodash');
const AllPosts = require('models/AllPost');
const Share = require('models/Share');
const { FilterContent, getPagination, getPagingData } = require('utils/consts');
const { API, AUTH, REQUEST } = require('src/pages/api/consts');

const handler = async (req, res) => {
  if (req.method === REQUEST.POST) {
    const {
      body: { videoType, videoCategory, accountType },
      headers: { authorization },
      query: { search, sort, category, rating, page }
    } = req;
    let currentPage = page;
    try {
      if (!authorization) {
        return res.status(401).send({ error: true, data: [], message: AUTH.NOT_LOGGED_IN });
      }
      const { username } = jwt.verify(authorization.split(' ')[1], process.env.SECRET_KEY);

      const { id: userId } = await User.findOne({
        attributes: ['id'],
        where: { username, isDeleted: false, isBlocked: false }
      });

      const ArrayOfFollowedPeopleId = [];
      ArrayOfFollowedPeopleId.push(userId);

      const followers = await db.query(
        `select "followingId" as "followers" from "following" f where "followedId"=${userId}`
      );

      followers && followers[0].map(({ followers }) => ArrayOfFollowedPeopleId.push(followers));

      // console.log('ArrayOfFollowedPeopleId', ArrayOfFollowedPeopleId);

      const { limit, offset } = getPagination(currentPage, 5);
      const videosCount = await AllPosts.count({
        // where: { VideoId: 1},
        include: [
          {
            model: Video,
            include: [
              {
                model: User
              }
            ]
          },
          {
            model: Share,
            include: [
              {
                model: User
              }
            ]
          }
        ],
        where: FilterContent(search, category, videoType, videoCategory, accountType, ArrayOfFollowedPeopleId, rating)
      });

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
            attributes: ['id', 'caption', 'createdAt'],
            include: [
              {
                model: User,
                attributes: ['id', 'username', 'picture', 'accountType', 'name', 'showName', 'showUsername']
              }
            ]
          }
        ],
        where: FilterContent(search, category, videoType, videoCategory, accountType, ArrayOfFollowedPeopleId, rating),
        limit: limit,
        offset: offset,
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

      for (let i = 0; i < videos.length; i++) {
        const item = videos[i];
        // console.log("item in filter videos",item);
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
        // const commentCount = await Comments.count({
        //     where: {
        //         AllPostId: id,
        //     }
        // });
        // const shareCount = await Share.count({
        //     where: {
        //         VideoId
        //     }
        // });
        let shareCount = Video.shareCount;
        const isFavourite = await Favourite.findOne({
          where: {
            reviewerId: userId,
            VideoId: Video.id
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

        if (Video.videoCost === 'Paid') {
          paid = await Pay.findOne({
            where: {
              userId: userId,
              videoId: VideoId
            }
          });
        }

        videos[i] = {
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
          isLiked: isLiked ? true : false,
          hasPaid: paid !== null ? true : false,
          isFavourite: isFavourite !== null ? true : false
        };
      }
      // console.log("current page",currentPage)
      const response = getPagingData(videos, currentPage, limit, videosCount);
      res.status(200).json({
        error: false,
        message: API.SUCCESS,
        data: { videos, ...response }
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
