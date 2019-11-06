// Import necessary Node.js files
const db = require('../../models');

//verifies whether person making group is authorized user
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

router.post("/api/group", function (req, res) {
	// console.log(`top log:${req.signedCookies}`);
	db.Groups.create(req.body).then(function (dbGroups) {
		// console.log(`Inside function: ${req.signedCookies}`);
		// res.cookie('user').send('cookie set');
		// sends su'ccess status
		res.status(200).send(dbGroups);
	}).catch(function (err) {
		throw err
	})
	// console.log(`outside function: ${req.signedCookies}`);

});

// Export these routers
module.exports = router;

// TODO: find where cookie is stored in req.body (?) Object, compare to access token using code below:

			// jwt.verify(accessToken, process.env.JWT_SECRET_KEY, function(err, decoded) {
			// 	if (err) {
			// 		console.log('ERR: ' + err);
			// 	}
			// 	else {
			// 		console.log('DEC: ' + JSON.stringify(decoded));
			// 	}
			// });