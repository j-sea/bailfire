require('dotenv').config();
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

// nodemailer & OAuth
const oauth2Client = new OAuth2(
     "366128959881-16919sv5rimuhjrdbgrkcendai6tl6c7.apps.googleusercontent.com", 
     "4LBcucg5uHT6yW5chCdu9uLF", // Client Secret here
     "https://developers.google.com/oauthplayground" // Redirect URL
);

// nodemailer & OAuth - Uses the Refresh token to get an Access token from OAuth.
oauth2Client.setCredentials({
     refresh_token: "ya29.Il-vB90gKpsBqKSDko-4qoRGBJc_8Vhe5xGS63kqQnchHQvjv5mRmme0IzjKR5ZmB3OxhodaDlME2wWH3OtEinvGSG1MJn4CTOb2RCBaVom5i8fJc1IG7V7SvJ2FdxNU7w"
});
const accessToken = oauth2Client.getAccessToken()

// nodemailer & OAuth - Describes how we want to send the email using SMTP and Nodemailer
const smtpTransport = nodemailer.createTransport({
     service: "gmail",
     auth: {
          type: "OAuth2",
          user: "skatterbailfire@gmail.com", 
          clientId: "366128959881-16919sv5rimuhjrdbgrkcendai6tl6c7.apps.googleusercontent.com",
          clientSecret: "4LBcucg5uHT6yW5chCdu9uLF",
          refreshToken: "ya29.Il-vB90gKpsBqKSDko-4qoRGBJc_8Vhe5xGS63kqQnchHQvjv5mRmme0IzjKR5ZmB3OxhodaDlME2wWH3OtEinvGSG1MJn4CTOb2RCBaVom5i8fJc1IG7V7SvJ2FdxNU7w",
          accessToken: accessToken
     }
});

// Here we give our email some content
const mailOptions = {
     from: "skatterbailfire@gmail.com",
     to: "skatterbailfire@gmail.com, msantiago2222@yahoo.com",
     subject: "Node.js Email with Secure OAuth",
     generateTextFromHTML: true,
     html: "<b>test</b>"
};

// This sends our email
smtpTransport.sendMail(mailOptions, (error, response) => {
     error ? console.log(error) : console.log(response);
     smtpTransport.close();
});


module.exports = router;
