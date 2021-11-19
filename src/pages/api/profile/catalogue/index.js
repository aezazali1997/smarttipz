const Video = require('models/Video');

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
                attributes: ['id'],
                where: { username }
            });
            if (!user) {
                return res.status(404).send({ error: true, data: [], message: 'User Not Found' })
            }

            console.log('user: ', user);
            const { id } = user;

            const videos = await Video.findAll({
                include: [{ model: User, attributes: ['name', 'username'] }],
                where: { UserId: id, catalogue: true, isApproved: true },
                order: [["createdAt", "DESC"]]
            })

            console.log('videos: ', videos);

            res.status(200).json({
                error: false,
                message: 'Data fetched successfully',
                data: { catalogues: videos }
            });
        } catch (err) {
            res.status(500).send({ error: true, data: [], message: err.message });
        }
    }

    else if (req.method === 'POST') {
        const { body: { videoId, catalogue }, headers: { authorization } } = req;


        try {
            if (!authorization) {
                return res.status(401).send({ error: true, data: [], message: 'Please Login' })
            };
            const { username } = jwt.verify(
                authorization.split(' ')[1],
                process.env.SECRET_KEY
            );

            const user = await User.findOne({
                attributes: ['id'],
                where: { username }
            });
            if (!user) {
                return res.status(404).send({ error: true, data: [], message: 'User Not Found' })
            }

            console.log('user: ', user);

            const { id } = user;

            await Video.update({ catalogue: !catalogue }, {
                where: { id: videoId, isApproved: true },
            })

            res.status(200).json({
                error: false,
                message: 'Video added to catalogue',
                data: {}
            });
        } catch (err) {
            res.status(500).send({ error: true, data: [], message: err.message });
        }
    }

    else {
        res.status(404).end('Page Not Found');
    }
};

export default handler;