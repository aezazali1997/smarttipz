import PostLikee from 'models/Like';
import Share from 'models/Share';

const User = require('models/User');
const Video = require('models/Video');
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');

const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            if (!req.headers.authorization) {
                return res.status(401).send({ error: true, data: [], message: 'Please Login' })
            }
            const { username } = jwt.verify(
                req.headers.authorization.split(' ')[1],
                process.env.SECRET_KEY
            );

            const { id } = await User.findOne({
                attributes: ['id'],
                where: { username, isDeleted: false, isBlocked: false }
            });

            const videos = await Video.findAll({
                attributes: {
                    include: [
                        [sequelize.fn("COUNT", sequelize.col("PostLikees.id")), 'likeCount'],
                        // [sequelize.fn("COUNT", sequelize.col("Shares.id")), 'shareCount'],
                        [sequelize.where(sequelize.col("PostLikees.reviewerId"), id), 'isLiked'],
                    ]
                },
                include: [
                    {
                        model: PostLikee, attributes: ['isLiked', 'VideoId', 'reviewerId', 'id']
                    },
                    {
                        model: User, attributes: ['name', 'username', 'picture']
                    },
                    {
                        model: Share, attributes: ['reviewerId', 'VideoId']
                    }
                ],
                where: {
                    isApproved: true,
                },
                group: ['Video.id', 'PostLikees.id', 'Shares.id', 'User.id', 'User.name',
                    'User.picture', 'User.username', 'PostLikees.reviewerId', 'PostLikees.isLiked',
                    // 'Shares.reviewerId, Shares.VideoId'
                ],
                order: [["createdAt", "DESC"]]
            });

            res.status(200).json({
                error: false,
                message: 'success',
                data: { videos }
            });

        } catch (err) {
            console.log("Videos Api Failed Error: ", err.message);
            res.status(500).send({ error: true, data: [], message: err.message });
        }
    } else {
        res.status(404).end('Page Not Found');
    }
};

export default handler;
