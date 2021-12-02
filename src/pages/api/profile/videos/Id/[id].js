import PostLikee from 'models/Like';

const jwt = require('jsonwebtoken');
const User = require('models/User');
const Video = require('models/Video');
const sequelize = require('sequelize');


const handler = async (req, res) => {
    if (req.method === 'GET') {
        const { query: { id: videoId }, headers: { authorization } }
            = req;
        try {
            if (!authorization) {
                return res.status(401).send({ error: true, data: [], message: 'Please Login' })
            }

            const { id } = jwt.verify(
                authorization.split(' ')[1],
                process.env.SECRET_KEY
            );

            const video = await Video.findOne({
                attributes: {
                    include: [[sequelize.fn("COUNT", sequelize.col("PostLikees.id")), 'likeCount'],
                    [sequelize.where(sequelize.col("PostLikees.reviewerId"), id), 'isLiked']]
                },
                include: [
                    {
                        model: PostLikee, attributes: ['isLiked', 'VideoId', 'reviewerId', 'id']
                    },
                    {
                        model: User, attributes: ['name', 'username', 'picture']
                    }],
                where: {
                    id: videoId, isApproved: true
                },
                group: ['Video.id', 'User.id', 'User.name', 'User.picture', 'User.username',
                    'PostLikees.id', 'PostLikees.reviewerId', 'PostLikees.isLiked'],
            });

            res.status(200).json({
                message: 'success',
                data: { video }
            });
        } catch (err) {
            console.log("Videos Api Failed Error: ", err.message);
            res.status(500).send({ error: true, data: [], message: err.message });
        }
    }

    else {
        res.status(404).end('Page Not Found');
    }
};

export default handler;
