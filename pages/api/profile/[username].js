const User = require('../../../models/User');
const jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method === 'GET') {

        const {

            headers,
            query: { username }
        } = req;


        try {
            if (!headers.authorization) {
                return res.status(401).send({ error: true, data: [], message: 'Please Login' })
            };

            const result = jwt.verify(
                req.headers.authorization.split(' ')[1],
                process.env.SECRET_KEY
            );

            console.log('params: ', username);
            const user = await User.findOne({
                attributes: [
                    'id',
                    'name',
                    'email',
                    'avgRating',
                    'totalViews',
                    'about',
                    'picture',
                    'phoneNumber',
                    'showPhone',
                    'accessible',
                    'accountType',
                    'showName',
                    'showUsername'
                ],
                where: { username }
            });
            console.log('user: ', user);
            if (!user) {
                return res.status(404).send({ error: true, data: [], message: 'User Not Found' })
            }

            const { id, name, email, avgRating, totalViews, about, picture, phoneNumber, showPhone, accessible, showName,
                showUsername, accountType } = user;

            res.status(200).json({
                error: false,
                message: 'Data fetched successfully',
                data: {
                    id: id,
                    name: name,
                    email: email,
                    username,
                    rating: avgRating,
                    views: totalViews,
                    about: about,
                    picture: picture,
                    phone: phoneNumber,
                    showPhone: showPhone,
                    showName,
                    showUsername,
                    accessible: accessible,
                    accountType: accountType
                }
            });
        } catch (err) {
            res.status(500).send({ error: true, data: [], message: err.message });
        }
    } else {
        res.status(404).end('Page Not Found');
    }
};

export default handler;