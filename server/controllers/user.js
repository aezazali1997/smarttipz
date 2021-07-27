const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../data");
const sendEmail = require("../sendMail");

const checkUsername = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username } = req.params;

    try {
        const response = await User.findOne({ where: { username } });
        res.status(200).json({ message: "success", data: { found: !!response } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const checkEmail = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.params;

    try {
        const response = await User.findOne({ where: { email } });
        res.status(200).json({ message: "success", data: { found: !!response } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const signup = async (req, res) => {
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
};

const confirmation = async (req, res) => {
    try {
        const { user } = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
        await User.update({ emailConfirmed: true }, { where: { id: user } });
        res.status(200).json({ message: "User Varified" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const signin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error("User deos not exist.");
        }

        if (!user.passConfirmed) {
            throw new Error("Please Confirm Email.");
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new Error("User failed to login.");
        }

        const token = jwt.sign({ user: user.id }, process.env.SECRET_KEY, {
            expiresIn: "1h",
        });

        res.status(200).json({ message: "success", data: user.id, token: token });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};

const forgot = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const email = req.body.email;
    try {
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            throw new Error("User Does Not Exist.");
        }

        const token = jwt.sign({ user: user.id }, process.env.EMAIL_SECRET, {
            expiresIn: "1d",
        });

        const url = `http://${process.env.BASE_URL}/api/user/forgotconfirmation/${token}`;

        await sendEmail(
            email,
            "Varify Password Change",
            `<p>Please click on the <a href=${url}>link</a> to change your password.</p>`
        );

        res.status(201).json({ message: "success" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const forgotconfirmation = async (req, res) => {
    try {
        const { user } = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
        await User.update({ forgotpassConfirmed: true }, { where: { id: user } });
        res.status(200).json({ message: "User Varified" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const changepass = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const id = req.body.id;
    const newPassword = req.body.newPassword;
    const newEncPassword = await bcrypt.hash(newPassword, 12);

    try {
        const user = await User.findOne({ where: { id: id } });
        if (!user) {
            throw new Error("User Does Not Exist");
        }
        if (!user.forgotpassConfirmed) {
            throw new Error("Please Confirm Email Varification");
        }
        await User.update(
            { password: newEncPassword, forgotpassConfirmed: false },
            { where: { id: user.id } }
        );
        res.status(201).json({ message: "Password Updated Successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    signup,
    confirmation,
    signin,
    forgot,
    forgotconfirmation,
    changepass,
    checkUsername,
    checkEmail,
};