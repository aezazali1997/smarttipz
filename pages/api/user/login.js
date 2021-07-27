import userController from '../../../server/controllers/user';


export default function LoginHandler(req, res) {
    if (req.method === 'POST') {
        req.body("email")
            .isEmail()
            .normalizeEmail()
            .withMessage("Email address is not valid!"),
            req.body("password")
                .trim()
                .isLength({ min: 8 })
                .withMessage("Password length must be at least 8 characters")
                .isLength({ max: 64 })
                .withMessage("Password must not be greater than 64 characters"),

            userController.signin
    } else if (req.method === 'GET') {
        res.status(200).send({ error: false, data: { name: 'Smart-tipz' }, message: 'Smart-tipz GET API' });
    }
}