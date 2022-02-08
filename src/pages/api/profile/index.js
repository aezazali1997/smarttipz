import AllPosts from 'models/AllPost';
import Video from 'models/Video';
import sequelize from 'sequelize';
import db from 'models/db';
import { isEmpty } from 'lodash';
const User = require('models/User');
const jwt = require('jsonwebtoken');

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      if (!req.headers.authorization) {
        return res.status(401).send({ error: true, data: [], message: 'Please Login' })
      };
      const { username } = jwt.verify(
        req.headers.authorization.split(' ')[1],
        process.env.SECRET_KEY
      );


      const user = await User.findOne({
        attributes: [
          'id',
          'name',
          'email',
          'avgRating',
          'totalViews',
          'about',
          'picture',
          'phoneNumber',
          'showName',
          'showUsername',
          'showPhone',
          'accessible',
          'accountType',
          'isApproved',
          'tip'
        ],
        where: { username }
      });

      const rating = await db.query(`select avg(r.rating) as"avgRating" from "Users" u 
                    left join "Videos" v ON u.id=v."UserId"
                    left join "AllPosts" p on v.id = p."VideoId"
                    left join "Ratings" r on p.id = r."AllPostId" 
                    where (u.id=${user.id})
                    group by u.id`)

      const avgRating = isEmpty(rating[0]) ? 0 : rating[0][0].avgRating;


      if (!user) {
        return res.status(404).send({ error: true, data: [], message: 'User Not Found' })
      }

      const { name, email, totalViews, about, picture, phoneNumber, showPhone, accessible,
        accountType, showUsername, showName, isApproved, tip } = user;

      res.status(200).json({
        error: false,
        message: 'Data fetched successfully',
        data: {
          name: name,
          email: email,
          username,
          rating: avgRating,
          views: totalViews,
          about: about,
          picture: picture,
          phone: phoneNumber,
          showPhone: showPhone,
          accessible: accessible,
          showPhone: showPhone,
          showName: showName,
          showUsername: showUsername,
          accountType: accountType,
          isApproved,
          tip
        }
      });
    } catch (err) {
      res.status(500).send({ error: true, data: [], message: err.message });
    }
  } else {
    res.status(404).end('Page Not Found');
  }
};

export default handler;