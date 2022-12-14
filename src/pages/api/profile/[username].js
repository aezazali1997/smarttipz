const { isEmpty } = require('lodash');
const db = require('models/db');
const User = require('models/User');
const jwt = require('jsonwebtoken');
const { API, AUTH, REQUEST } = require('src/pages/api/consts');
const handler = async (req, res) => {
  if (req.method === REQUEST.GET) {
    const {
      headers: { authorization },
      query: { username }
    } = req;

    try {
      if (!authorization) {
        return res.status(401).send({ error: true, data: [], message: AUTH.NOT_LOGGED_IN });
      }
      const result = jwt.verify(authorization.split(' ')[1], process.env.SECRET_KEY);

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
        where: { username, isDeleted: false, isBlocked: false }
      });
      if (!user) {
        return res.status(404).send({ error: true, data: [], message: AUTH.NO_USER_FOUND });
      }

      const rating = await db.query(`select avg(r.rating) as"avgRating" from "Users" u 
                    left join "Videos" v ON u.id=v."UserId"
                    left join "AllPosts" p on v.id = p."VideoId"
                    left join "Ratings" r on p.id = r."AllPostId" 
                    where (u.id=${user.id})
                    group by u.id`);

      const avgRating = isEmpty(rating[0]) ? 0 : rating[0][0].avgRating;
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
        tip
      } = user;

      res.status(200).json({
        error: false,
        message: API.SUCCESS,
        data: {
          id: id,
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
      res.status(500).send({ error: true, data: [], message: `${API.ERROR}:${err.message}` });
    }
  } else {
    res.status(404).end(API.NO_PAGE);
  }
};

export default handler;
