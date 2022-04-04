const User = require('models/User');
const Video = require('models/Video');
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');
const {API,AUTH,REQUEST} = require('src/pages/api/consts')
const handler = async (req, res) => {
    if (req.method === REQUEST.GET) {
        const { body: { videoId }, headers: { authorization } }
            = req;
        try {
            if (!authorization) {
                return res.status(401).send({ error: true, data: [], message: AUTH.NOT_LOGGED_IN })
            }
            const { username } = jwt.verify(
                authorization.split(' ')[1],
                process.env.SECRET_KEY
            );

            const user = await User.findOne({
                attributes: ['id'],
                where: { username }
            });

            if (!user) {
                return res.status(404).send({ error: true, data: [], message: AUTH.NO_USER_FOUND })
            }
            const { id } = user;

            const videos = await Video.findAll({
                include: [
                    {
                        model: User, attributes: ['name', 'username', 'picture']
                    }],
                where: {
                    UserId: id,
                    isApproved: true,
                    category: {
                        [sequelize.Op.not]: 'catalogue'
                    },
                },
                order: [["createdAt", "DESC"]]
            });

            res.status(200).json({
                message: API.SUCCESS,
                data: { videos }
            });
        } catch (err) {
            console.log("Videos Api Failed Error: ", err.message);
            res.status(500).send({ error: true, data: [], message: `${API.ERROR}:${err.message}` });
        }
    }

    else {
        res.status(404).end(API.NO_PAGE);
    }
};

export default handler;
