const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const SendEmail = async (email, subject, content, templateId) => {
  const msg = {
    to: `${email}`, // Change to your recipient
    from: {
      email: process.env.SENDER_EMAIL, // Change to your verified sender
      name: 'SmartTipz'
    },
    subject: `${subject}`,
    templateId: templateId,
    dynamicTemplateData: {
      message: `${content}`,
    },
  }

  try {
    const res = await sgMail.send(msg);
    console.log("Email sent successfully");
    return { success: true };
  }
  catch (e) {
    console.log(e.message)
    return { success: false, message: e.message };
  }
}
module.exports = SendEmail;