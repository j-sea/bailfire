require('dotenv').config();
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

router.post('/api/email', function (req, res) {
    // nodemailer & OAuth
    const oauth2Client = new OAuth2(
        process.env.OAUTH_CLIENT_ID,    
        process.env.OAUTH_CLIENT_SECRET,
         "https://developers.google.com/oauthplayground" // Redirect URL
    );
    
    // nodemailer & OAuth - Uses the Refresh token to get an Access token from OAuth.
    oauth2Client.setCredentials({
         refresh_token: process.env.OAUTH_REFRESH_TOKEN
    });
    
    const accessToken = oauth2Client.getAccessToken()
    
    // nodemailer & OAuth - Describes how we want to send the email using SMTP and Nodemailer
    const smtpTransport = nodemailer.createTransport({
         service: "gmail",
         auth: {
              type: "OAuth2",
              user: "skatterbailfire@gmail.com", 
              clientId: process.env.OAUTH_CLIENT_ID,
              clientSecret: process.env.OAUTH_CLIENT_SECRET,
              refreshToken: process.env.OAUTH_REFRESH_TOKEN,
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
});


module.exports = router;
