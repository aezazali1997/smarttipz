import { isEmpty } from 'lodash';
const jwt = require('jsonwebtoken');
import AllPosts from 'models/AllPost';
import Rating from 'models/Rating';
import User from 'models/User';
import db from 'models/db';
import Video from 'models/Video';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const {
      body,
      body: { postId, rating },
      headers: { authorization }
    } = req;

    try {
      if (!authorization) {
        return res.status(401).send({ error: true, data: [], message: 'Please Login' });
      }

      const { username, id } = jwt.verify(authorization.split(' ')[1], process.env.SECRET_KEY);

      if (!body) {
        return res.status(400).send({ error: true, data: [], message: 'No data passed to server' });
      }

      const user = await User.findOne({
        where: { id }
      });

      const newPost = await AllPosts.findOne({
        where: { id: postId },
        attributes: ['id', 'VideoId']
      });
      const hasRated = await Rating.findOne({
        where: {
          reviewerId: user.id,
          AllPostId: newPost.id
        }
      });
      if (!isEmpty(hasRated)) {
        // if rated
        await Rating.update(
          {
            rating: rating
          },
          {
            where: {
              reviewerId: user.id,
              AllPostId: newPost.id
            }
          }
        );
      } else {
        const newRating = await Rating.create({
          reviewerId: user.id,
          rating: rating,
          AllPostId: newPost.id
        });
        await newRating.setAllPost(newPost);
      }

      const ratings =
        await db.query(`select avg(r."rating") as "avgRating", count(r."AllPostId") as "totalRaters" from "AllPosts" p
						left join "Ratings" as r on p.id=r."AllPostId"
						where (p.id=${postId} and r."AllPostId"=${postId})
						group by p.id`);

      const avgRating = isEmpty(ratings[0]) ? 0 : ratings[0][0].avgRating;

      const video = await Video.findOne({ where: { id: newPost.VideoId } });

      await video.update({
        rating: avgRating
        // parse float
      });
      const profileRating=await db.query(`
       select avg(nullif (v.rating,0)) from "Videos" v where v."UserId" =${video.UserId} and v."isApproved" =true 
      `)
      const profileAvgRating = isEmpty(profileRating[0]) ? 0 : profileRating[0][0].avg;
      await User.update(
        {
          avgRating:profileAvgRating
        },
        {
          where:{
            id:video.UserId
          }
        }
      )

      return res.status(201).json({
        error: false,
        message: 'Post rated successfully',
        data: {
          hasRated:!isEmpty(hasRated),
          newAvg:avgRating,
          profileUpdatedRating:profileAvgRating
        }
      });
    } catch (err) {
      console.log('Rate Api Failed Error: ', err.message);
      res.status(500).send({ error: true, data: [], message: err.message });
    }
  } else {
    res.status(404).end('Page Not Found');
  }
};

export default handler;
