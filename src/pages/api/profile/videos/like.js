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

            const video = await Video.findOne({ where: { id: videoId } });

            const like = await PostLike.create({
                reviewerId: id
            });

            await like.setVideo(video);

            res.status(201).json({
                error: false,
                message: 'Post liked successfully',
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
