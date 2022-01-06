import AllPosts from 'models/AllPost';
import PostLikee from 'models/Like';

const Share = require('models/Share');
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
                            '$Video.category$': {
                                [sequelize.Op.not]: 'catalogue'
                            }
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

            res.status(200).json({
                message: 'success',
                data: { videos }
            });
        } catch (err) {
            console.log("Videos Api Failed Error: ", err.message);
            res.status(500).send({ error: true, data: [], message: err.message });
        }
    }
    else if (req.method === 'DELETE') {
        const { query: { id }, headers: { authorization } } = req;

        try {
            if (!authorization) {
                return res.status(401).send({ error: true, data: [], message: 'Please Login' })
            };

            const { username } = jwt.verify(
                authorization.split(' ')[1],
                process.env.SECRET_KEY
            );

            await Video.update(
                { isApproved: false }, {
                where: { id },
            });

            res.status(200).json({ error: false, data: {}, message: 'Video deleted successfuly.' });
        }
        catch (err) {
            console.log(err)
            res.status(500).send({ error: true, data: [], message: err.message });
        }
    }
    else {
        res.status(404).end('Page Not Found');
    }
};

export default handler;
