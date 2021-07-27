
import userController from '../../../server/controllers/user';
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../../server/data");
const sendEmail = require("../../../server/sendMail");


export default async function SignupHandler(req, res) {
    if (req.method === 'POST') {
        // req.body("username")
        //     .not()
        //     .isEmpty()
        //     .withMessage("username cannot be empty")
        //     .trim()
        //     .escape()
        //     .isAlphanumeric()
        //     .withMessage("username must be alpha-numeric"),
        //     req.body("email")
        //         .isEmail()
        //         .normalizeEmail()
        //         .withMessage("Email address is not valid!")
        //         .trim(),
        //     req.body("password")
        //         .trim()
        //         .isLength({ min: 8 })
        //         .withMessage("Password length must be at least 8 characters")
        //         .isLength({ max: 64 })
        //         .withMessage("Password must not be greater than 64 characters")

        // userController.signup;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;

        let user = null;

        try {
            user = await User.findOne({ where: { username } });
            if (user) {
                throw new Error("Username already exists");
            }

            user = await User.findOne({ where: { email } });
            if (user) {
                throw new Error("Email already in use");
            }

            const encPassword = await bcrypt.hash(password, 12);
            const newUser = await User.create({
                username,
                email,
                password: encPassword,
            });

            const token = jwt.sign({ user: newUser.id }, process.env.EMAIL_SECRET, {
                expiresIn: "1d",
            });

            const url = `http://${process.env.BASE_URL}/api/user/confirmation/${token}`;

            sendEmail(
                email,
                "Account Varification",
                `<p>Your account created successfully. Please click on the <a href=${url}>link</a> to activate.</p>`
            );

            res.status(201).json({ message: "User Successfuly Created." });
        } catch (err) {
            res.status(422).json({ error: err.message });
        }
    } else if (req.method === 'GET') {
        res.status(200).send({ error: false, data: { name: "Smart-tipz" }, message: "Welcome to smart-tipz" })
    }
}