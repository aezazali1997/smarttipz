import { isEmpty } from 'lodash';

const jwt = require('jsonwebtoken');
const User = require('models/User');
const bcrypt = require('bcryptjs');

const handler = async (req, res) => {
    if (req.method === 'PUT') {

        const {
            body,
            body: { oldPassword, newPassword },
            headers
        } = req;

        try {
            if (!headers.authorization) {
                return res.status(401).send({ error: true, data: [], message: 'Please Login' })
            }

            const { username } = jwt.verify(
                headers.authorization.split(' ')[1],
                process.env.SECRET_KEY
            );

            if (isEmpty(body)) {
                return res.status(404).send({ error: true, data: [], message: 'No data passed to server' })
            }

            const user = await User.findOne({ where: { username } });

            if (isEmpty(user)) {
                return res.status(404).send({ error: true, data: [], message: 'No user found' })
            }

            const verified = await bcrypt.compare(oldPassword, user.password);
            console.log('verified:', verified);

            if (!verified) {
                return res.status(400).send({ error: true, data: [], message: 'Old password is incorrect' })
            }

            if (oldPassword === newPassword) {
                return res.status(400).send({ error: true, data: [], message: 'Old password cannot be new password' })
            }

            const encpass = await bcrypt.hash(newPassword, 12);

            await user.update({ password: encpass });

            res.status(200).json({ message: 'Updated successfully' });
        } catch (err) {
            res.status(500).json({ error: true, message: err.message });
        }
    }
    else {
        res.status(404).end('Page Not Found');
    }
};

export default handler;
