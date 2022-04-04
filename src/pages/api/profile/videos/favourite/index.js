import { API, AUTH, REQUEST } from 'src/pages/api/consts';

const Favourite = require('models/Favourite');

const User = require('models/User');
const Video = require('models/Video');
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');

const handler = async (req, res) => {
    if (req.method === REQUEST.GET) {
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
                message: API.SUCCESS,
                data: {}
            });
        } catch (err) {
            console.log("Videos Api Failed Error: ", err.message);
            res.status(500).send({ error: true, data: [], message: `${API.ERROR}:${err.message}` });
        }
    }

    else if (req.method === REQUEST.POST) {
        const {
            body,
            body: { videoId },
            headers: { authorization }
        } = req;

        try {
            if (!authorization) {
                return res.status(401).send({ error: true, data: [], message: AUTH.NOT_LOGGED_IN })
            }

            const { username } = jwt.verify(
                authorization.split(' ')[1],
                process.env.SECRET_KEY
            );

            if (!body) {
                return res.status(400).send({ error: true, data: [], message: AUTH.NO_USER_SENT })
            }

            const { id } = await User.findOne({
                attributes: ['id'],
                where: { username, isBlocked: false, isDeleted: false }
            });

            // console.log('id => ', id);

            const video = await Video.findOne({
                attributes: ['id'],
                where: { id: videoId, isApproved: true }
            });

            // console.log('video => ', video);


            const post = await Favourite.findOne({ where: { VideoId: video.id, reviewerId: id } });

            // console.log('post => ', post);
// 

            if (post === null) {
                const favourite = await Favourite.create({
                    reviewerId: id,
                });

                await favourite.setVideo(video);
                return res.status(201).json({
                    error: false,
                    message: API.SUCCESS,
                    data: {}
                });
            }
            await Favourite.destroy({ where: { reviewerId: id } });
            // res.status(200).json({
            //     error: false,
            //     message: 'Post removed from favourites',
            //     data: {}
            // });

        } catch (err) {
            console.log("Favourite Api Failed Error: ", err.message);
            res.status(500).send({ error: true, data: [], message: `${API.ERROR}:${err.message}` });
        }
    }

    else {
        res.status(404).end('Page Not Found');
    }
};

export default handler;
