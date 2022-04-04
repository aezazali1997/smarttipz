const User = require('models/User');
const jwt = require('jsonwebtoken');
const {API,AUTH,REQUEST} = require('src/pages/api/consts')
const handler = async (req, res) => {
    if (req.method === REQUEST.GET) {
        const {
            headers,
            query: { username }
        } = req;

        try {
            if (!headers.authorization) {
                return res.status(401).send({ error: true, data: [], message: AUTH.NOT_LOGGED_IN });
            }

            jwt.verify(
                req.headers.authorization.split(' ')[1],
                process.env.SECRET_KEY
            );


            const user = await User.findOne({
                attributes: ['id','avgRating','totalViews'],
                where: { username }
            });
            if (!user) {
                return res.status(404).send({ error: true, data: [], message: AUTH.NO_USER_FOUND });
            }

            const followers = await user.getFollower();

            const followed = await user.getFollowed();

            res.status(200).json({
                error: false,
                data: {
                    followers: followers,
                    followed: followed,
                     avgProfileRating:user.avgRating
                },
                message: API.SUCCESS
            });
        } catch (err) {
            res.status(500).send({ error: true, data: [], message: `${API.ERROR}:${err.message}` });
        }
    } else {
        res.status(404).end(API.NO_PAGE);
    }
};

export default handler;