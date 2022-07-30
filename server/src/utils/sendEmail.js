const nodeMailer = require('nodemailer');

require('dotenv').config();

const sendEmail = async (options) => {
  let testAccount = await nodeMailer.createTestAccount();

  const transporter = nodeMailer.createTransport({
    host: 'smtp.163.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.password, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: process.env.USER_NODEMAILER,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
