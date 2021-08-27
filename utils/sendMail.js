const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, body) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.TEMP_EMAIL,
      pass: process.env.TEMP_MAILPASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let mailOptions = {
    from: process.env.TEMP_EMAIL,
    to: to,
    subject: subject,
    html: body,
  };

  await transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log('error', error.message);
      return res
        .status(400)
        .send({ error: true, message: 'Email Not sent, try again' });
    } else
      return res.send({
        error: false,
        data: [],
        message: 'Email Send Successfully',
      });
  });
};

module.exports = sendEmail;
