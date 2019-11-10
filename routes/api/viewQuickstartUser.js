// Import necessary Node.js files
const db = require('../../models');

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

// Retrieve a quickstart user that hasn't upgraded into a full user yet
router.get("/api/user/quickstart", function (req, res) {
	// Locate the quickstart user
	db.Users.findOne({
		where: {
			user_uuid: req.body.user_uuid,
		}
	})
	.then(function (quickstartUser) {
		// Check if the user is actually a QuickStart user
		if (quickstartUser.email === null && quickstartUser.phone === null && quickstartUser.password === null) {
			res.status(200).send(quickstartUser);
		}
		// This isn't a QuickStart user, deny info
		else {
			res.status(500).send('Server encountered error when loading quickstart user!');
		}
	})
	.catch(function (error) {
		console.log(error);
		res.status(500).send('Server encountered error when loading quickstart user!');
	});
});

// Export these routers
module.exports = router;
