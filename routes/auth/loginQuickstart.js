// Import necessary Node.js files
const db = require('../../models');

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

// Retrieve a quickstart user that hasn't upgraded into a full user yet
router.post("/auth/quickstart/login", function (req, res) {
	// Create a new user with only a UUID which is used for QuickStart users
	db.Users.findOne({
		where: {
			user_uuid: req.body.user_uuid,
		}
	})
	.then(function (quickstartUser) {
		// Check if the user is actually a QuickStart user
		if (quickstartUser.email === null && quickstartUser.phone === null && quickstartUser.password === null) {
			req.session.user = { id: quickstartUser.id, user_uuid: quickstartUser.user_uuid }
			req.session.error = null;
			res.status(200).send({user: req.session.user});
		}
		// This isn't a QuickStart user, deny login
		else {
			req.session.user = false;
			req.session.error = 'Server encountered error when loading quickstart user!';
			res.status(500).send('Server encountered error when loading quickstart user!');
		}
	})
	.catch(function (error) {
		console.log(error);
		req.session.user = false;
		req.session.error = 'Server encountered error when loading quickstart user!';
		res.status(500).send('Server encountered error when loading quickstart user!');
	});
});

// Export these routers
module.exports = router;
