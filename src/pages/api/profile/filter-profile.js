const User = require("models/User");

const jwt = require('jsonwebtoken');
const { FilterProfiles } = require("utils/consts");

const handler = async (req, res) => {
    if (req.method === 'POST') {

        const { query: { search, sort,rate }, body: { accountType } } = req;

        try {
            if (!req.headers.authorization) {
                return res.status(401).send({ error: true, data: [], message: 'Please Login' })
            };
            const { username } = jwt.verify(
                req.headers.authorization.split(' ')[1],
                process.env.SECRET_KEY
            );

            const users = await User.findAll({
                include: ['Followed', 'Follower'],
                attributes: [
                    'id',
                    'name',
                    'email',
                    'picture',
                    'showName',
                    'username',
                    'showUsername',
                    'accountType',
                    'accessible',
                    'avgRating'
                ],
                where: FilterProfiles(search, accountType,rate),
                order: [["createdAt", sort]]
            });

            if (!users) {
                return res.status(404).send({ error: true, data: [], message: 'User Not Found' })
            }

            res.status(200).json({
                error: false,
                message: 'Data fetched successfully',
                data: { users }
            });
        } catch (err) {
            res.status(500).send({ error: true, data: [], message: err });
        }
    } else {
        res.status(404).end('Page Not Found');
    }
};


module.exports = handler;