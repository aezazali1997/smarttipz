import AllPosts from 'models/AllPost';
import Video from 'models/Video';
import sequelize from 'sequelize';
import db from 'models/db';
import { isEmpty } from 'lodash';
const User = require('models/User');
const jwt = require('jsonwebtoken');
const { API, AUTH, REQUEST } = require('src/pages/api/consts');
const stripe = require('stripe')(process.env.STRIPE_SK);
const handler = async (req, res) => {
  if (req.method === 'GET') {
   
    try {
      if (!req.headers.authorization) {
        return res.status(401).send({ error: true, data: [], message: AUTH.NOT_LOGGED_IN });
      }
      const { username } = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY);
      const temp_user = await User.findOne({
        where: {
          username
        }
      });
      const account = await stripe.accounts.retrieve(temp_user.stripeAccountId);
      console.log('check details submitted', account);
      if (account.charges_enables) {
        await User.update(
          {
            onBoarded: true
          },
          {
            where: {
              username: username
            }
          }
        );
      }

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
          'tip',
          'totalTipsAmount',
          'stripeAccountId',
          'onBoarded'
        ],
        where: { username }
      });

      const rating = await db.query(`select avg(v.rating) as"avgRating" from "Videos" v where ("UserId"=${user.id})`);
      /* 
                    select avg(r.rating) as"avgRating" from "Users" u 
                    left join "Videos" v ON u.id=v."UserId"
                    left join "AllPosts" p on v.id = p."VideoId"
                    left join "Ratings" r on p.id = r."AllPostId" 
                    where (u.id=${user.id})
                    group by u.id */

      const avgRating = isEmpty(rating[0]) ? 0 : rating[0][0].avgRating;

      if (!user) {
        return res.status(404).send({ error: true, data: [], message: AUTH.NO_USER_FOUND });
      }

      const {
        id,
        name,
        email,
        totalViews,
        about,
        picture,
        phoneNumber,
        showPhone,
        accessible,
        accountType,
        showUsername,
        showName,
        isApproved,
        tip,
        totalTipsAmount,
        stripeAccountId,
        onBoarded
      } = user;

      res.status(200).json({
        error: false,
        message: API.SUCCESS,
        data: {
          id,
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
          tip,
          totalTipsAmount,
          stripeAccountId,
          onBoarded
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