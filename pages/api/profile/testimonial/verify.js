import _, { isEmpty } from 'lodash';

const Joi = require('joi');
const jwt = require('jsonwebtoken');

const User = require('../../../../models/User');
const Testimonial = require('../../../../models/Testimonial');

const handler = async (req, res) => {
    if (req.method === 'POST') {

        const { body, body: { token } } = req;

        try {

            const { username, ownerEmail } = jwt.verify(
                token,
                process.env.SECRET_KEY
            );
            console.log('here', username, ownerEmail);

            const data = await Testimonial.findOne({ attributes: ['ownerEmail'], where: { username, ownerEmail } });
            // console.log('here: ', data, data && _.isEqual(data, token));
            if (data) {
                return res.status(400).send({ error: true, message: 'You have already reviewed', data: [] });
            }
            else {
                return res.status(200).send({ error: false, message: '', data: { username, ownerEmail } });
            }
        }
        catch (err) {
            console.log('errr', err)
            res.status(500).json({ error: true, message: err, data: [] });
        }
    }
    else {
        res.status(404).end('Page Not Found');
    }
};

export default handler;
