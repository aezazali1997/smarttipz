import User from 'models/User';
import jwt from 'jsonwebtoken';
import { API, AUTH, REQUEST } from 'src/pages/api/consts';
const handler = async (req, res) => {
  if (req.method == REQUEST.GET) {
    const { authorization } = req.headers;

    // no header
    if (!authorization) {
      return res.status(401).send({
        error: true,
        data: [],
        message: AUTH.NOT_LOGGED_IN
      });
    }

    const { id: userId } = jwt.verify(authorization.split(' ')[1], process.env.SECRET_KEY);
    if (!userId) {
      return res.status(404).send({
        error: true,
        message: AUTH.NO_USER_FOUND,
        data: {}
      });
    }

    const { id } = req.query;
    const { name, picture } = await User.find({
      where: {
        id
      }
    });
    return res.status(200).send({
      error: false,
      message: API.SUCCESS,
      data: {
        name,
        picture
      }
    });
  } else {
    return res.status(404).send(API.NO_PAGE);
  }
};
export default handler;
