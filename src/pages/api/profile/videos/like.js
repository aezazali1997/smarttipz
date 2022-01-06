import AllPosts from 'models/AllPost';

const PostLike = require('models/Like');

const User = require('models/User');
const Video = require('models/Video');
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');

const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            // if (!req.headers.authorization) {
            //     return res.status(401).send({ error: true, data: [], message: 'Please Login' })
            // }
            // const { username } = jwt.verify(
            //     req.headers.authorization.split(' ')[1],
            //     process.env.SECRET_KEY
            // );

            // const videos = await Video.findAll({
            //     where: {
            //         isApproved: true,
            //         category: {
            //             [sequelize.Op.not]: 'catalogue'
            //         },
            //     },
            //     order: [["createdAt", "DESC"]]
            // });

            res.status(200).json({
                error: false,
                message: 'success',
                data: {}
            });
        } catch (err) {
            console.log("Videos Api Failed Error: ", err.message);
            res.status(500).send({ error: true, data: [], message: err.message });
        }
    }

    else if (req.method === 'POST') {
        const {
            body,
            body: { videoId },
            headers: { authorization }
        } = req;

        try {
            if (!authorization) {
                return res.status(401).send({ error: true, data: [], message: 'Please Login' })
            }

            const { username } = jwt.verify(
                authorization.split(' ')[1],
                process.env.SECRET_KEY
            );

            if (!body) {
                return res.status(400).send({ error: true, data: [], message: 'No data passed to server' })
            }

            const { id } = await User.findOne({
                attributes: ['id'],
                where: { username, isBlocked: false, isDeleted: false }
            });

            console.log('id => ', id);

            const allPost = await AllPosts.findOne({
                attributes: ['id'],
                where: { id: videoId }
            });

            console.log('video => ', videoId);


            const post = await PostLike.findOne({ where: { AllPostId: videoId, reviewerId: id } });

            console.log('post => ', post);


            if (post === null) {
                const like = await PostLike.create({
                    reviewerId: id,
                    isLiked: true
                });

                await like.setAllPost(allPost);
                return res.status(201).json({
                    error: false,
                    message: 'Post liked',
                    data: {}
                });
            }
            await PostLike.destroy({ where: { reviewerId: id } });
            res.status(200).json({
                error: false,
                message: 'Post Unliked',
                data: {}
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
