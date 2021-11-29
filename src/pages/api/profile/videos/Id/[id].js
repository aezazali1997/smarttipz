const jwt = require('jsonwebtoken');
const User = require('models/User');
const Video = require('models/Video');

const handler = async (req, res) => {
    if (req.method === 'GET') {
        const { query: { id }, headers: { authorization } }
            = req;
        try {
            if (!authorization) {
                return res.status(401).send({ error: true, data: [], message: 'Please Login' })
            }

            const result = jwt.verify(
                authorization.split(' ')[1],
                process.env.SECRET_KEY
            );

            const video = await Video.findOne({
                include: [
                    {
                        model: User, attributes: ['name', 'username', 'picture']
                    }],
                where: {
                    id
                }
            });

            res.status(200).json({
                message: 'success',
                data: { video }
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
