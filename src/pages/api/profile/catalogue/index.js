import AllPosts from 'models/AllPost';
import Comments from 'models/Comments';
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

            const { id, id: userId } = user;

            const catalogues = await AllPosts.findAll({
                include: [
                    {
                        model: Video,
                        include: [
                            {
                                model: User, attributes: ['name', 'username', 'picture', 'tip']
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
                group: [
                    'AllPost.id',
                    'Share.id',
                    'Video.id',
                    'Video->User.id',
                    'Video->User.name',
                    'Video->User.username',
                    'Video->User.picture',
                ],
                order: [["createdAt", "DESC"]]
            });

            for (let i = 0; i < catalogues.length; i++) {
                const item = catalogues[i];
                const { id, VideoId, Video, Share: Shares, isShared, } = item;
                const likeCount = await PostLikee.count({
                    where: {
                        AllPostId: id
                    }
                });
                const isLiked = await PostLikee.find({
                    where: {
                        AllPostId: id,
                        reviewerId: userId
                    }
                });
                const commentCount = await Comments.count({
                    where: {
                        AllPostId: id,
                    }
                });
                const shareCount = await Share.count({
                    where: {
                        VideoId
                    }
                });

                const ratings = await db.query(`select avg(r."rating") as "avgRating", count(r."AllPostId") as "totalRaters" from "AllPosts" p
						left join "Ratings" as r on p.id=r."AllPostId"
						where (p.id=${id} and r."AllPostId"=${id})
						group by p.id`)


                const avgRating = isEmpty(ratings[0]) ? 0 : ratings[0][0].avgRating;
                const totalRaters = isEmpty(ratings[0]) ? 0 : ratings[0][0].totalRaters;

                catalogues[i] = { id, avgRating, totalRaters, VideoId, isShared, Video, Share: Shares, likeCount, shareCount, commentCount, isLiked: isLiked ? true : false }
            };

            res.status(200).json({
                error: false,
                message: 'Data fetched successfully',
                data: { catalogues: catalogues }
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