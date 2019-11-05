// Import necessary Node.js files
const db = require('../../models');

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

router.post("/auth/recover-session", function(req, res) {
	if (req.session.user) {
		res.status(200).json(req.session.user);
	}
	else {
		res.status(401).send('No session recovered.');
	}
});

// Export these routers
module.exports = router;