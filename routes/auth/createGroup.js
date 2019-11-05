// Import necessary Node.js files
const db = require('../../models');

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

router.post("/api/group", function (req, res) {
	if (req.session.user) {
		let newGroup = { ...req.body };
		newGroup.UserId = req.session.user.id
		db.Groups.create(newGroup).then(function (dbGroup) {
			// sends success status
			res.status(200).send(dbGroup);
			//if not sucessful, will catch error to inform user
		}).catch(function (err) {
			console.log(err);
			res.status(500).send('Attempt to create group unsuccessful')

		})
	} else {
		res.status(401).send('Please log in first.')
	}

});

// Export these routers
module.exports = router;

