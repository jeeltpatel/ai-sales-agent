const sgMail = require('@sendgrid/mail');
require('dotenv').config();


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(toEmail, subject, body) {
  const msg = {
    to: toEmail,  
    from: process.env.YOUR_EMAIL, 
    subject: subject,
    text: body, 
  };

  try {
    const response = await sgMail.send(msg);
    console.log(`Email sent to ${toEmail}:`, response);
  } catch (error) {
    console.error('Error sending email via SendGrid:', error.response.body.errors);
  }
}
sendEmail('jeelp1197@gmail.com', 'Test Subject', 'This is a test email.');
