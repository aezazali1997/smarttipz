import { isEmpty } from 'lodash';

const Joi = require('joi');
const jwt = require('jsonwebtoken');

const Testimonial = require('../../../../models/Testimonial');

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const validateditestimonial = (data) => {
      const schema = Joi.object({
        testimonialId: Joi.number().integer().required(),
        message: Joi.string().required()
      });
      return schema.validate(data);
    };

    const { error } = validateditestimonial(req.body);

    if (error)
      return res.status(400).json({ error: true, message: error.details[0].message, data: [] });

    try {
      if (!req.headers.authorization) {
        throw new Error('Please Login');
      }
      const { username } = jwt.verify(
        req.headers.authorization.split(' ')[1],
        process.env.SECRET_KEY
      );

      const { testimonialId, message } = req.body;

      const testimonial = await Testimonial.findOne({ where: { id: testimonialId } });

      if (!testimonial) throw new Error('No testimonial found');

      await testimonial.update({ testimonial: message });

      res.status(201).json({ error: false, message: 'success', data: [] });
    } catch (err) {
      res.status(422).json({ error: true, message: err.message, data: [] });
    }
  }
  else if (req.method === 'PUT') {
    const { body, headers } = req;
    // const validateditestimonial = (data) => {
    //   const schema = Joi.object({
    //     name: Joi.string().optional(),
    //     designation: Joi.string().optional(),
    //     description: Joi.string().optional(),
    //     image: Joi.string().optional().allow(''),
    //   });
    //   return schema.validate(data);
    // };

    // const { error } = validateditestimonial(body);

    // if (error)
    //   return res.status(400).json({ error: true, message: error.details[0].message, data: [] });

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

      const { name, designation, description, image, id } = req.body;

      const testimonial = await Testimonial.findOne({ where: { id } });

      if (!testimonial) {
        return res.status(404).send({ error: true, data: [], message: 'No testimonial found' })
      }

      await testimonial.update({
        id,
        username,
        ownerName: name,
        designation,
        description,
        picture: image
      });

      res.status(200).json({ error: false, message: 'Testimonial Updated successfully', data: [] });
    } catch (err) {
      res.status(500).json({ error: true, message: err.message, data: [] });
    }
  }
  else {
    res.status(404).end('Page Not Found');
  }
};

export default handler;
