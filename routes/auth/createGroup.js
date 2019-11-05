// Import necessary Node.js files
const db = require('../../models');

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

router.post("/api/group", function (req, res) {
	db.Groups.create(req.body).then(function (dbGroups) {
		// sends success status
		res.status(200).send(dbGroups);
		//TODO:dbUser.addGroup(123123)
	}).catch(function (err) {
		throw err
	})

});

// Export these routers
module.exports = router;

