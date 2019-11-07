require('dotenv').config();

// Import necessary Node.js files
const db = require('../../models');

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

router.post("/auth/register", function (req, res) {
	db.Users.create(req.body)
		.then(function (newUser) {

			//create new session property "user", set equal to logged in user
			req.session.user = { id: newUser.id, name: newUser.name }
			req.session.error = null;
			res.status(200).json(req.session.user);
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