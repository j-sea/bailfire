const nodemailer = require('nodemailer');

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'skatterbailfire@gmail.com',
        pass: 'skatterfire2019'
    }
});

let mailOptions = {
    from: 'skatterbailfire@gmail.com',
    to: 'msantiago2222@yahoo.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

router.post("/email", function (req, res) {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
})

// Export these routers
module.exports = router;
