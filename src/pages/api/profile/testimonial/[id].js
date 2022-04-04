import { isEmpty } from 'lodash';

const Joi = require('joi');
const jwt = require('jsonwebtoken');

const User = require('models/User');
const Testimonial = require('models/Testimonial');
const { API, AUTH, REQUEST } = require('src/pages/api/consts');
const handler = async (req, res) => {
  if (req.method === REQUEST.GET) {
    const {
      query,
      query: { id }, //Query has username but written as id. //
      headers
    } = req;
    try {
      if (!headers.authorization) {
        return res.status(401).json({ error: true, data: [], message: AUTH.NOT_LOGGED_IN });
      }
      const response = jwt.verify(headers.authorization.split(' ')[1], process.env.SECRET_KEY);

      if (isEmpty(query)) {
        return res.status(404).json({ error: true, data: [], message: AUTH.NO_USER_SENT });
      }

      const user = await User.findOne({ where: { username: id, accountType: 'Business' } });
      if (!user) {
        return res.status(404).json({ error: true, data: [], message: AUTH.NO_USER_FOUND });
      }

      const business = await user.getBusiness();

      const testimonials = await business.getTestimonials({
        where: { isDeleted: false },
        order: [['createdAt', 'DESC']]
      });

      // console.log(testimonials);

      res.status(200).json({
        error: false,
        message: API.SUCCESS,
        data: testimonials
      });
    } catch (err) {
      res.status(500).json({ error: true, message: `${API.ERROR}:${err.message}`, data: [] });
    }
  } else if (req.method === 'DELETE') {
    const {
      query,
      query: { id },
      headers
    } = req;
    try {
      if (!headers.authorization) {
        return res.status(401).send({ error: true, data: [], message: AUTH.NOT_LOGGED_IN });
      }

      const { username } = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY);

      if (isEmpty(query)) {
        return res.status(400).send({ error: true, data: [], message: AUTH.NO_USER_SENT });
      }

      const testimonial = await Testimonial.update({ isDeleted: true }, { where: { id } });

      if (!testimonial) {
        return res.status(404).send({ error: true, data: [], message: AUTH.NO_DATA });
      }

      // await testimonial.destroy();

      res.status(200).send({ error: false, message: API.SUCCESS, data: [] });
    } catch (err) {
      res.status(500).send({ error: true, message: `${API.ERROR}:${err.message}`, data: [] });
    }
  } else {
    res.status(404).end(API.NO_PAGE);
  }
};

export default handler;
