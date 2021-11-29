
const PostLikee = require('models/Like');
const User = require('models/User');
const Video = require('models/Video');
const jwt = require('jsonwebtoken');
import { FilterContent } from 'utils/consts';


const handler = async (req, res) => {
    if (req.method === 'GET') {

        const { headers: { authorization }, query: { search, sort } } = req;

        try {
            if (!authorization) {
                return res.status(401).send({ error: true, data: [], message: 'Please Login' })
            }
            const { username } = jwt.verify(
                authorization.split(' ')[1],
                process.env.SECRET_KEY
            );

            const { id } = await User.findOne({
                attributes: ['id'],
                where: { username, isDeleted: false, isBlocked: false }
            });

            const videos = await Video.findAll({
                include: [{
                    model: PostLikee

                }, {
                    model: User, attributes: ['name', 'username', 'email', 'picture']
                }],
                where: FilterContent(search),
                order: [["createdAt", sort]]
            });

            res.status(200).json({
                error: false,
                message: 'success',
                data: { videos }
            });

        } catch (err) {
            console.log("Videos Api Failed Error: ", err.message);
            res.status(500).send({ error: true, data: [], message: err.message });
        }
    } else {
        res.status(404).end('Page Not Found');
    }
};

export default handler;
