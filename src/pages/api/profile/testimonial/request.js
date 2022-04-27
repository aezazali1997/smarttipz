import { isEmpty } from 'lodash';

const Joi = require('joi');
const jwt = require('jsonwebtoken');

const User = require('models/User');
const Testimonial = require('models/Testimonial');
const { API, AUTH, REQUEST } = require('src/pages/api/consts');
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const handler = async (req, res) => {
    if (req.method === REQUEST.POST) {
      const {
        body,
        body: { email },
        headers
      } = req;

      const validateAddTestimonial = (data) => {
        const schema = Joi.object({
          email: Joi.string().email().required()
        });
        return schema.validate(data);
      };

      const { error } = validateAddTestimonial(body);

      if (error) return res.status(400).json({ error: true, message: error.details[0].message, data: [] });

      try {
        if (!headers.authorization) {
          return res.status(401).json({ error: true, data: [], message: AUTH.NOT_LOGGED_IN });
        }

        const { username } = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY);

        const { id, name } = await User.findOne({ attributes: ['id', 'name'], where: { username } });
        if (!id) {
          return res.status(404).json({ error: true, data: [], message: AUTH.NO_USER_FOUND });
        }

        let requestedUser = await Testimonial.findAll({ where: { ownerEmail: email } });
        if (!isEmpty(requestedUser)) {
          return res
            .status(404)
            .send({ error: true, data: [], message: 'User with this email has already added testimonial' });
        }

        const token = jwt.sign({ username, ownerEmail: email }, process.env.SECRET_KEY);

        const msg = {
          to: `${email}`,
          from: {
            email: process.env.SENDER_EMAIL, // Change to your verified sender
            name: 'SmartTipz'
          },
          // Change to your verified sender
          subject: 'Testimonial Request',
          templateId: 'd-c9ccdc9371c349dbb684bb13b08460f8',
          dynamicTemplateData: {
            username: name,
            clientToken: token
          }
        };

        sgMail
          .send(msg)
          .then((response) => {
            return res.send({
              error: false,
              data: {},
              message: API.SUCCESS
            });
          })
          .catch((error) => {
            console.error(error);
            return res.status(400).send({ error: true, message: 'Message not Sent, try again.' });
          });
      } catch (err) {
        res.status(500).json({ error: true, message: `${API.ERROR}:${err.message}`, data: [] });
      }
    } else {
      res.status(404).end(API.NO_PAGE);
    }
};

export default handler;
