const jwt = require('jsonwebtoken');
require('dotenv').config();

// Import necessary Node.js files
const db = require('../../models');

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

router.post("/auth/register", function(req, res) {
	db.Users.create(req.body)
	.then(function (newUser) {
		const expiresIn = 24 * 60 * 60;
		const accessToken = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET_KEY, {
			expiresIn: expiresIn
		});

		res.status(200)
		.send({
			user: newUser,
			access_token: accessToken,
			expires_in: expiresIn,
		});
	})
	.catch(function (error) {
		console.log(error);
		res.status(500).send('Server encountered error when registering user!');
	});
});

// Export these routers
module.exports = router;