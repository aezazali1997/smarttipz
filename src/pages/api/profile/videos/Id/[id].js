import AllPosts from 'models/AllPost';
import Comments from 'models/Comments';
import PostLikee from 'models/Like';
import Shares from 'models/Share';
import db from 'models/db';
const jwt = require('jsonwebtoken');
const Users = require('models/User');
const Videos = require('models/Video');
import { isEmpty } from 'lodash';

const handler = async (req, res) => {
    if (req.method === 'GET') {
        const { query: { id: videoId }, headers: { authorization } }
            = req;
        try {
            if (!authorization) {
                return res.status(401).send({ error: true, data: [], message: 'Please Login' })
            }

            const { id: userId } = jwt.verify(
                authorization.split(' ')[1],
                process.env.SECRET_KEY
            );


            let video = await AllPosts.findOne({
                include: [
                    {
                        model: Videos,
                        include: [
                            {
                                model: Users, attributes: ['name', 'username', 'picture', 'tip']
                            },
                        ],
                    },
                    {
                        model: Shares, attributes: ['id', 'caption']
                    }
                ],
                where: {
                    id: videoId
                },
                group: ['AllPost.id', 'Video.id', 'Video->User.id', 'Video->User.name',
                    'Video->User.username', 'Video->User.picture', 'Share.id'
                ],
            });

            const result = await getStats(video, userId);

            res.status(200).send({
                message: 'success',
                data: { video: result }
            });


        } catch (err) {
            console.log("Video Detail Api Failed: ", err.message);
            res.status(500).send({ error: true, data: [], message: err.message });
        }
    }

    else {
        res.status(404).end('Page Not Found');
    }
};

export default handler;


const getStats = async (video, userId) => {
    let tempData = JSON.parse(JSON.stringify(video));
    const { id, VideoId } = tempData;
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
    const shareCount = await Shares.count({
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

    const data = { ...tempData, avgRating, totalRaters, likeCount, commentCount, shareCount, isLiked: isLiked ? true : false }
    return data;

}