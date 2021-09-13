const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const SendEmail = (email, subject, content) => {

  try {
    const msg = {
      to: `${email}`, // Change to your recipient
      from: {
        email: process.env.SENDER_EMAIL, // Change to your verified sender
        name: 'Smart Tipz'
      },
      subject: `${subject}`,
      html: `${content}`
    }

    sgMail
      .send(msg)
      .then((response) => {
        console.log(response[0].statusCode)
        console.log(response[0].headers)
      })
      .catch((error) => {
        console.error(error)
      })
    console.log("Email sent successfully");
  }
  catch (e) {
    console.log(e.message)
  }
}
module.exports = SendEmail;