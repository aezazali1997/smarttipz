import AllPosts from 'models/AllPost';
import PostLikee from 'models/Like';
import Share from 'models/Share';

const Video = require('models/Video');

const User = require('models/User');
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');

const handler = async (req, res) => {
    if (req.method === 'GET') {

        const { query: { username }, headers: { authorization } } = req;
        try {
            if (!authorization) {
                return res.status(401).send({ error: true, data: [], message: 'Please Login' })
            };
            const result = jwt.verify(
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

            // const videos = await Video.findAll({
            //     attributes: {
            //         include: [
            //             [sequelize.fn("COUNT", sequelize.col("PostLikees.id")), 'likeCount'],
            //             [sequelize.where(sequelize.col("PostLikees.reviewerId"), id), 'isLiked']
            //         ]
            //     },
            //     include: [{
            //         model: PostLikee, attributes: ['isLiked', 'VideoId', 'reviewerId', 'id']
            //     },
            //     {
            //         model: Share, attributes: ['id']
            //     },
            //     { model: User, attributes: ['name', 'username', 'picture'] }],
            //     where: { UserId: id, catalogue: true, isApproved: true },
            //     group: ['Video.id', 'User.id', 'User.name', 'User.picture', 'User.username',
            //         'PostLikees.id', 'PostLikees.reviewerId', 'PostLikees.isLiked', 'Shares.id'],
            //     order: [["createdAt", "DESC"]]
            // })
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


    else {
        res.status(404).end('Page Not Found');
    }
};

export default handler;