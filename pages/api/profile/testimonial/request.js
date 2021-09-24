import { isEmpty } from 'lodash';

const Joi = require('joi');
const jwt = require('jsonwebtoken');

const User = require('../../../../models/User');
const Testimonial = require('../../../../models/Testimonial');

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const handler = async (req, res) => {
    if (req.method === 'POST') {

        const { body, body: { email }, headers } = req;

        const validateAddTestimonial = (data) => {
            const schema = Joi.object({
                email: Joi.string().email().required(),
            });
            return schema.validate(data);
        };

        const { error } = validateAddTestimonial(body);

        if (error)
            return res.status(400).json({ error: true, message: error.details[0].message, data: [] });

        try {
            if (!headers.authorization) {
                return res.status(401).json({ error: true, data: [], message: 'Please Login' });
            }

            const { username } = jwt.verify(
                req.headers.authorization.split(' ')[1],
                process.env.SECRET_KEY
            );

            const { id } = await User.findOne({ attributes: ['id'], where: { username } });
            if (!id) {
                return res.status(404).json({ error: true, data: [], message: 'No user found' });
            }

            const token = jwt.sign({ id, username }, process.env.SECRET_KEY);

            // await Testimonial.update({ token }, { where: { username: username } })

            const msg = {
                to: `${email}`, // Change to your recipient
                from: {
                    email: process.env.SENDER_EMAIL, // Change to your verified sender
                    name: 'Smart Tipz'
                }, // Change to your verified sender
                subject: 'Testimonial Request',
                templateId: 'd-d2f73fe79778431ba1644a1aa8474f2c',
                dynamicTemplateData: {
                    username: username,
                    clientToken: token
                },
            }
            console.log("msg => ", msg);
            sgMail
                .send(msg)
                .then((response) => {
                    console.log(response[0].statusCode)
                    console.log(response[0].headers)
                    return res.send({
                        error: false,
                        data: {},
                        message: 'Message sent successfully',
                    });

                })
                .catch((error) => {
                    console.error(error)
                    return res
                        .status(400)
                        .send({ error: true, message: 'Message not Sent, try again.' });
                }
                )

        } catch (err) {
            res.status(500).json({ error: true, message: err.message, data: [] });
        }
    }
    else {
        res.status(404).end('Page Not Found');
    }
};

export default handler;
