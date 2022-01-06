const PostLikee = require('models/Like');
const User = require('models/User');
const Video = require('models/Video');
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');
import AllPosts from 'models/AllPost';
import Share from 'models/Share';
import { FilterContent } from 'utils/consts';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const {
            body: { videoType, videoCategory, accountType },
            headers: { authorization },
            query: { search, sort, category }
        } = req;
        try {
            if (!authorization) {
                return res.status(401).send({ error: true, data: [], message: 'Please Login' });
            }
            const { username } = jwt.verify(authorization.split(' ')[1], process.env.SECRET_KEY);

            const { id } = await User.findOne({
                attributes: ['id'],
                where: { username, isDeleted: false, isBlocked: false }
            });

            const videos = await AllPosts.findAll({
                attributes: {
                    include: [
                        [sequelize.fn('COUNT', sequelize.col('PostLikees.AllPostId')), 'likeCount'],
                        [sequelize.where(sequelize.col('PostLikees.reviewerId'), id), 'isLiked']
                    ]
                },
                include: [
                    {
                        model: PostLikee,
                        attributes: ['AllPostId', 'reviewerId', 'id']
                    },
                    {
                        model: Video,
                        include: [
                            {
                                model: User,
                                attributes: ['name', 'username', 'picture']
                            }
                        ]
                    },
                    {
                        model: Share,
                        attributes: ['id', 'caption'],
                        include: [
                            {
                                model: User,
                                attributes: [
                                    'id',
                                    'username',
                                    'picture',
                                    'accountType',
                                    'name',
                                    'showName',
                                    'showUsername'
                                ]
                            }
                        ]
                    }
                ],
                where: FilterContent(search, category, videoType, videoCategory, accountType),
                group: [
                    'AllPost.id',
                    'PostLikees.reviewerId',
                    'PostLikees.AllPostId',
                    'PostLikees.id',
                    'Video.id',
                    'Video->User.id',
                    'Video->User.name',
                    'Video->User.username',
                    'Video->User.picture',
                    'Share.id',
                    'Share->User.id',
                    'Share->User.username',
                    'Share->User.picture',
                    'Share->User.accountType',
                    'Share->User.name',
                    'Share->User.showName',
                    'Share->User.showUsername'
                ],
                order: [['createdAt', sort]]
            });

            res.status(200).json({
                error: false,
                message: 'success',
                data: { videos }
            });
        } catch (err) {
            console.log('Videos Api Failed Error: ', err.message);
            res.status(500).send({ error: true, data: [], message: err.message });
        }
    } else {
        res.status(404).end('Page Not Found');
    }
};

export default handler;
