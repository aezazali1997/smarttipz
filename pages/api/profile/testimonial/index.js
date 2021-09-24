import { isEmpty } from 'lodash';

const Joi = require('joi');
const jwt = require('jsonwebtoken');

const User = require('../../../../models/User');
const Testimonial = require('../../../../models/Testimonial');

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      if (!req.headers.authorization) {
        return res.status(401).json({ error: true, data: [], message: 'Please Login' });
      }
      const { username } = jwt.verify(
        req.headers.authorization.split(' ')[1],
        process.env.SECRET_KEY
      );

      const user = await User.findOne({ where: { username, accountType: 'Business' } });
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
  else if (req.method === 'POST') {
    const validateAddTestimonial = (data) => {
      const schema = Joi.object({
        ownerName: Joi.string().required(),
        designation: Joi.string().required(),
        description: Joi.string().required(),
        picture: Joi.string().optional().allow(''),
        username: Joi.string().required()
      });
      return schema.validate(data);
    };

    const { error } = validateAddTestimonial(req.body);

    if (error)
      return res.status(400).json({ error: true, message: error.details[0].message, data: [] });

    try {
      // if (!req.headers.authorization) {
      //   return res.status(401).json({ error: true, data: [], message: 'Please Login' });
      // }
      // const { username } = jwt.verify(
      //   req.headers.authorization.split(' ')[1],
      //   process.env.SECRET_KEY
      // );
      const { ownerName, description, designation, picture, username } = req.body;

      const user = await User.findOne({ where: { username, accountType: "Business" } });
      if (!user) {
        return res.status(404).json({ error: true, data: [], message: 'No user found' });
      }

      const business = await user.getBusiness();

      await Testimonial.create({ username, ownerName, description, designation, picture, BusinessId: business.id });

      res.status(201).json({ error: false, message: 'Testimonial Added Successfully', data: [] });

    } catch (err) {
      res.status(500).json({ error: true, message: err.message, data: [] });
    }
  }
  else if (req.method === 'PUT') {
    const { body, body: { id, isVisible }, headers } = req;
    try {
      if (!headers.authorization) {
        return res.status(401).send({ error: true, data: [], message: 'Please Login' })
      }
      const { username } = jwt.verify(
        req.headers.authorization.split(' ')[1],
        process.env.SECRET_KEY
      );

      if (isEmpty(body)) {
        return res.status(400).send({ error: true, data: [], message: 'No data send to server' })
      }

      console.log('body: ', body);
      // const { ownerName, designation, description, picture, id } = body;

      // const testimonial = await Testimonial.findOne({ where: { id } });

      // if (!testimonial) {
      //   return res.status(404).send({ error: true, data: [], message: 'No testimonial found' })
      // }

      // await testimonial.update({
      //   id,
      //   username,
      //   ownerName,
      //   designation,
      //   description,
      //   picture
      // });

      const testimonial = await Testimonial.findOne({ where: { id } });
      await testimonial.update({
        id,
        username,
        isVisible: !isVisible
      });
      res.status(200).send({ error: false, message: 'Testimonial Updated successfully', data: [] });

    } catch (err) {
      res.status(500).send({ error: true, message: err.message, data: [] });
    }
  }
  else {
    res.status(404).end('Page Not Found');
  }
};

export default handler;
