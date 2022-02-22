const Comment = require('models/Comments');
const AllPosts = require('models/AllPost');
const jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method === 'DELETE') {
        const {
            query: { id },
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
            const comment=await Comment.find({
                where:{
                    id:id
                },
                attributes:['id','AllPostId']
            })
            // console.log("comment",comment.AllPostId);
            await Comment.destroy({
                where: { id: id }
            });
              const allPost = await AllPosts.find({
                attributes: ['id','commentCount'],
                where: { id: comment.AllPostId }
            });
            
            await AllPosts.update(
                {commentCount:allPost.commentCount-1},
                {where:{
                    id:comment.AllPostId
                }}
            )

            return res.status(200).json({
                error: false,
                message: 'Comment deleted successfully',
                data: []
            });

        } catch (err) {
            console.log("delete Comment Api Failed Error: ", err.message);
            res.status(500).send({ error: true, data: [], message: err.message });
        }
    }

    else {
        res.status(404).end('Page Not Found');
    }
};

export default handler;
