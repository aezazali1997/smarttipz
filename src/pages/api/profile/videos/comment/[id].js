const Comment = require('models/Comments');
const AllPosts = require('models/AllPost');
const jwt = require('jsonwebtoken');
const {API,AUTH,REQUEST} = require('src/pages/api/consts')
const handler = async (req, res) => {
    if (req.method === REQUEST.DELETE) {
        const {
            query: { id },
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
                message: API.SUCCESS,
                data: []
            });

        } catch (err) {
            console.log("delete Comment Api Failed Error: ", err.message);
            res.status(500).send({ error: true, data: [], message: `${API.ERROR}:${err.message}` });
        }
    }

    else {
        res.status(404).end(API.NO_PAGE);
    }
};

export default handler;
