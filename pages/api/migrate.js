const User = require('../../models/User');
const Business = require('../../models/Business');
const nodemailer = require("nodemailer");

const handler = async (req, res) => {
    User.sync({ force: true });
    // Business.sync({ force: true });

    res.status(200).send({ message: "Tables created Successfully" });
}
export default handler;