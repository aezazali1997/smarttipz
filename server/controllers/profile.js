const jwt = require("jsonwebtoken");

const User = require("../data/models/User");

const main = async (req, res) => {
    const { user: id } = jwt.verify(
        req.headers.authorization.split(" ")[1],
        process.env.SECRET_KEY
    );

    try {
        const user = await User.findOne({ where: { id: id } });
        if (!user) {
            throw new Error("Please Login");
        }
        res.status(200).json({
            message: "success",
            data: { name: user.name, email: user.email, address: user.address },
        });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};

const uploadPic = async (req, res) => {
    try {
        if (!req.headers.authorization) {
            throw new Error("Please Login");
        }
        const { user: id } = jwt.verify(
            req.headers.authorization.split(" ")[1],
            process.env.SECRET_KEY
        );

        const user = await User.findOne({ where: { id: id } });
        if (!user) {
            throw new Error("Please Login");
        }

        if (!req.file) {
            throw new Error("No File Attached");
        }

        await user.update({ picture: req.file.path }, { where: { id: id } });
        res.status(201).json({ message: "success" });
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
};

module.exports = { main, uploadPic };