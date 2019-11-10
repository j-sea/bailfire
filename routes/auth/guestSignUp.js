// Import necessary Node.js files
const db = require('../../models');

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

// Let's generate a guest user to log back in with
router.post("/auth/guest/register", function (req, res) {
	// Create a new user with only a UUID which is used for QuickStart users
	db.Users.create({})
	.then(function (newUser) {
		// Send the user back to the requester
		res.status(200).json(newUser);
	})
	.catch(function (error) {
		console.log(error);
		req.session.user = false;
		req.session.error = 'Server encountered error when registering user!';
		res.status(500).send('Server encountered error when registering user!');
	});
});

// Export these routers
module.exports = router;
