import AllPosts from 'models/AllPost';
import Rating from 'models/Rating';
import User from 'models/User';

const jwt = require('jsonwebtoken');

const handler = async (req, res) => {


    if (req.method === 'POST') {
        const {
            body,
            body: { postId, rating },
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

            const newPost = await AllPosts.findOne({
                where: { id: postId }, attributes: ['id']
            });

            const newRating = await Rating.create({
                reviewerId: user.id,
                rating: rating,
                AllPostId: newPost.id
            })

            await newRating.setAllPost(newPost);

            return res.status(201).json({
                error: false,
                message: 'Post rated successfully',
                data: {}
            });

        } catch (err) {
            console.log("Rate Api Failed Error: ", err.message);
            res.status(500).send({ error: true, data: [], message: err.message });
        }
    }

    else {
        res.status(404).end('Page Not Found');
    }
};

export default handler;
