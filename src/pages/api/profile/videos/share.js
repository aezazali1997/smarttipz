import AllPosts from 'models/AllPost';
import User from 'models/User';

const Share = require('models/Share');
const Video = require('models/Video');
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');

const handler = async (req, res) => {
    if (req.method === 'GET') {

        const { headers: { authorization } } = req;

        try {
            if (!authorization) {
                return res.status(401).send({ error: true, data: [], message: 'Please Login' })
            }
            const { username } = jwt.verify(
                authorization.split(' ')[1],
                process.env.SECRET_KEY
            );

            const sharedPosts = await Share.findAll({
                include: [{
                    model: Video
                }]
            });

            console.log('sharedPosts: ', sharedPosts);

            res.status(200).json({
                error: false,
                message: 'success',
                data: { sharedPosts }
            });

        } catch (err) {
            console.log("Shared Posts Api Failed Error: ", err.message);
            res.status(500).send({ error: true, data: [], message: err.message });
        }
    }

    else if (req.method === 'POST') {
        const {
            body,
            body: { videoId, caption },
            headers: { authorization }
        } = req;

        try {
            if (!authorization) {
                return res.status(401).send({ error: true, data: [], message: 'Please Login' })
            }

            const { username, id } = jwt.verify(
                authorization.split(' ')[1],
                process.env.SECRET_KEY
            );

            if (!body) {
                return res.status(400).send({ error: true, data: [], message: 'No data passed to server' })
            }

            const user = await User.findOne({
                where: { id }
            });

            const video = await Video.findOne({
                attributes: ['id','shareCount'],
                where: { id: videoId, isApproved: true }
            });

            const share = await Share.create({
                UserId: id,
                caption,
                VideoId: video.id
            });

            const newPost = await AllPosts.create({
                VideoId: video.id,
                isShared: true,
                ShareId: share.id
            });
            await Video.update(
                {shareCount:video.shareCount+1},
                {
                    where:{
                        id:video.id
                    }
                }
            )
            
            await share.setUser(user);
            await newPost.setShare(share);
            await newPost.setVideo(video);
            await share.setVideo(video);

            return res.status(201).json({
                error: false,
                message: 'Video Shared',
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
