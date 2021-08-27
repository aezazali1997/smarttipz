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

  const response = await transporter.sendMail(mailOptions);
  console.log('response', response);
  return response;


};

module.exports = sendEmail;
