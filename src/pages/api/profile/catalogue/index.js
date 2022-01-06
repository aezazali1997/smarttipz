import AllPosts from 'models/AllPost';
import PostLikee from 'models/Like';

const Video = require('models/Video');
const Share = require('models/Share');
const sequelize = require('sequelize');
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

            const { id } = user;

            const videos = await AllPosts.findAll({
                attributes: {
                    include: [
                        [sequelize.fn("COUNT", sequelize.col("PostLikees.id")), 'likeCount'],
                        [sequelize.where(sequelize.col("PostLikees.reviewerId"), id), 'isLiked'],
                    ]
                },
                include: [
                    {
                        model: PostLikee, attributes: ['id']
                    },
                    {
                        model: Video,
                        include: [
                            {
                                model: User, attributes: ['name', 'username', 'picture']
                            },
                        ],
                    },
                    {
                        model: Share, attributes: ['id', 'caption']
                    }
                ],
                where: {
                    [sequelize.Op.and]: [
                        {
                            '$Video.isApproved$': {
                                [sequelize.Op.eq]: true
                            },
                        },
                        {
                            '$Video.UserId$': {
                                [sequelize.Op.eq]: id
                            },
                        },
                        {
                            '$Video.catalogue$': {
                                [sequelize.Op.eq]: true
                            },
                        },
                        {
                            isShared: {
                                [sequelize.Op.eq]: false
                            },
                        }
                    ]
                },
                group: ['AllPost.id', 'PostLikees.reviewerId', 'PostLikees.id',
                    'Video.id', 'Video->User.id', 'Video->User.name', 'Video->User.username', 'Video->User.picture',
                    'Share.id'
                ],
                order: [["createdAt", "DESC"]]
            });
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

            const { VideoId } = await AllPosts.findOne({
                where: { id: videoId }, attributes: ['VideoId']
            });

            await Video.update({ catalogue: !catalogue }, {
                where: { id: VideoId, isApproved: true },
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