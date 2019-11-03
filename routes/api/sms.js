const twilio = require('twilio');
const dotenv = require('dotenv');
const cfg = {};

const router = require('express').Router();

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
    dotenv.config({ path: '.env' });
} else {
    dotenv.config({ path: '.env.example', silent: true });
}

cfg.port = process.env.PORT || 3000;

cfg.accountSid = process.env.TWILIO_ACCOUNT_SID;
cfg.authToken = process.env.TWILIO_AUTH_TOKEN;
cfg.sendingNumber = process.env.TWILIO_NUMBER;

router.post("/sms", function (req, res) {
    // var client = new twilio(cfg.accountSid, cfg.authToken);
    var client = twilio(cfg.accountSid, cfg.authToken);

    client.messages
        .create({
            body: 'Hello from Node',
            to: '+12064769484',  // Text this number
            from: process.env.TWILIO_NUMBER // From a valid Twilio number
            // from: '+19792272939' // From a valid Twilio number
            statusCallback: 'https://postb.in/1572809055005-8314476483501',
            // statusCallbackMethod: "POST"
        })
        .then((message) => {
            console.log(message);
            res.status(200).json(message);
        });
})

// // Export these routers
module.exports = router;

