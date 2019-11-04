// Import necessary Node.js files
const db = require('../../models');

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

router.post("/auth/logout", function(req, res) {
	req.session.destroy(function () {
		res.status(200).send('successfully logged out')
	});
	// res.clearCookie('access_token');
	// res.status(200).send({
	// 	user: null,
	// });
});

// Export these routers
module.exports = router;