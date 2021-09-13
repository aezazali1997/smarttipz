import { isEmpty } from 'lodash';

const Joi = require('joi');
const jwt = require('jsonwebtoken');

const User = require('../../../../models/User');
const Testimonial = require('../../../../models/Testimonial');

const handler = async (req, res) => {
    if (req.method === 'GET') {
        const { query,
            query: { id }, //Query has username but written as id. //
            headers
        } = req;
        try {
            if (!headers.authorization) {
                return res.status(401).json({ error: true, data: [], message: 'Please Login' });
            }
            const response = jwt.verify(
                headers.authorization.split(' ')[1],
                process.env.SECRET_KEY
            );

            if (isEmpty(query)) {
                return res.status(404).json({ error: true, data: [], message: 'No username is passed to serever' });
            }

            const user = await User.findOne({ where: { username: id, accountType: 'Business' } });
            if (!user) {
                return res.status(404).json({ error: true, data: [], message: 'No user found' });
            }

            const business = await user.getBusiness();

            const testimonials = await business.getTestimonials({ where: { isDeleted: false }, order: [["createdAt", "DESC"]] });

            console.log(testimonials);

            res.status(200).json({
                error: false, message: 'Data fetched successfully', data: testimonials
            });
        } catch (err) {
            res.status(500).json({ error: true, message: err.message, data: [] });
        }
    }
    else if (req.method === 'DELETE') {
        const { query, query: { id }, headers } = req;
        try {
            if (!headers.authorization) {
                return res.status(401).send({ error: true, data: [], message: 'Please Login' })
            }

            const { username } = jwt.verify(
                req.headers.authorization.split(' ')[1],
                process.env.SECRET_KEY
            );

            if (isEmpty(query)) {
                return res.status(400).send({ error: true, data: [], message: 'No id passed to server' })
            }

            const testimonial = await Testimonial.update({ isDeleted: true }, { where: { id } });

            if (!testimonial) {
                return res.status(404).send({ error: true, data: [], message: 'No testimonial found' })
            }

            // await testimonial.destroy();

            res.status(200).send({ error: false, message: 'Testimonial deleted successfully', data: [] });

        } catch (err) {
            res.status(500).send({ error: true, message: err.message, data: [] });
        }

    }
    else {
        res.status(404).end('Page Not Found');
    }
};

export default handler;
