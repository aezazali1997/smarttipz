const Entity = require('models/Entity');
const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { body } = req;
    const { title, description } = body;
    console.log('title is ', title, 'desc is ', description);
    await Entity.create({
      title,
      description
    });
  }
  return res.status(201).send('Entity created succefully');
  // if (req.method === 'PUT') {
  //   const { body, params } = req;
  //   const { title, description } = body;
  //   const { id } = params;
  //   console.log('title is ', title, 'desc is ', description, 'id', id);
  //   await Entity.update(
  //     {
  //       title,
  //       description
  //     },
  //     {
  //       where: {
  //         id
  //       }
  //     }
  //   );
  // }
  // return res.status(201).send('Entity updated succefully');
};
module.exports = handler;
