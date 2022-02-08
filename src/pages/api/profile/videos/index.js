import { isEmpty } from 'lodash';
import AllPosts from 'models/AllPost';
import Comments from 'models/Comments';
import PostLikee from 'models/Like';

const Share = require('models/Share');
const User = require('models/User');
const Video = require('models/Video');
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');
import db from 'models/db';



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
            const { id, id: userId } = user;

            const videos = await AllPosts.findAll({
                include: [
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
                group: [
                    'AllPost.id',
                    'Video.id',
                    'Share.id',
                    'Video->User.id',
                    'Video->User.name',
                    'Video->User.username',
                    'Video->User.picture',
                ],
                order: [["createdAt", "DESC"]]
            });

            for (let i = 0; i < videos.length; i++) {
                const item = videos[i];
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

                videos[i] = { id, totalRaters, avgRating, VideoId, isShared, Video, Share: Shares, likeCount, shareCount, commentCount, isLiked: isLiked ? true : false }
            };

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
