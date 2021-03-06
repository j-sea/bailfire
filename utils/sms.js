require('dotenv').config();
const twilio = require('twilio');

module.exports = function (phone, inviteUUID) {
    const urlPrepend = (process.env.PORT) ? 'https://scatter-web.herokuapp.com' : 'http://localhost:3000';

    var client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    client.messages
        .create({
            // body: 'To ACCEPT ScATTeR Group Invite:\n' + urlPrepend + '/group-invite/accept/' + inviteUUID + '\n\nTo DECLINE ScATTeR Group Invite:\n' + urlPrepend + '/group-invite/reject/' + inviteUUID,
            body:
                `To ACCEPT ScATTeR Group Invite:
${urlPrepend}/group-invite/accept/${inviteUUID}

To DECLINE ScATTeR Group Invite:
${urlPrepend}/group-invite/reject/${inviteUUID}`,
            to: phone,  // Text this number
            from: process.env.TWILIO_NUMBER // From a valid Twilio number
        })
        .then((message) => {
            console.log(message);
        })
        .catch(error => {
            console.error(error);
        });
};
