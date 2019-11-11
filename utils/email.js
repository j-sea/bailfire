require('dotenv').config();
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

module.exports = function (email, inviteUUID) {
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
    
    const urlPrepend = (process.env.PORT) ? 'https://scatter-web.herokuapp.com' : 'http://localhost:3000';
    // Here we give our email some content
    const mailOptions = {
         from: "skatterbailfire@gmail.com",
         to: email,
         subject: "Someone has sent you a ScATTeR groups invite!",
         generateTextFromHTML: true,
         html: "<h1>Someone has sent you a ScATTeR groups invite!</h1> \
               <p>If you don't know who sent this, or you aren't expecting an invite, <b>please</b> ignore this e-mail.</p> \
               <p>ScATTeR is a Group Locating app where you can keep your group outings coordinated between members.</p> \
               <p>Your location is shared to your group automatically when you want.</p> \
               <p>If you are sure you want to join this person's ScATTeR group and share your location, click here to <b>accept the invite</b>: <a href=\"" + urlPrepend + "/group-invite/accept/" + inviteUUID + "\">" + urlPrepend + "/group-invite/accept/" + inviteUUID + "</a></p> \
               <p>If you don't want to join this person's ScATTeR group, either ignore this e-mail or click here to <b>reject the invite</b>: <a href=\"" + urlPrepend + "/group-invite/reject/" + inviteUUID + "\">" + urlPrepend + "/group-invite/reject/" + inviteUUID + "</a></p> \
               <p>If you'd like to learn more about ScATTeR, click here: <a href=\"https://scatter-web.herokuapp.com/\">https://scatter-web.herokuapp.com/</a></p>"
    };
    
    // This sends our email
    smtpTransport.sendMail(mailOptions, (error, response) => {
         error ? console.log(error) : console.log(response);
         smtpTransport.close();
    });
};
