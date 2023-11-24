

const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS, // Alamat email Anda
    pass: process.env.PASSWORD  // Password email Anda
  }
});

transporter.use('compile', hbs({
  viewEngine: {
      extName: '.handlebars',
      partialsDir: path.resolve('./views'),
      defaultLayout: false,
  },
  viewPath: path.resolve('./views'),
  extName: '.handlebars',
}));

sendEmail = async (to, subject, templateName, context) => {
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: to,
    subject: subject,
    template: templateName,
    context: context
};
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendEmail;
