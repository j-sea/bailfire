// Import necessary Node.js files
const db = require('../../models');

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

router.post("/api/group", function (req, res) {
	//any user with auth session can create group
	if (req.session.user) {
		//splice creates copy of Group
		let newGroup = { ...req.body };
		//add new column to table
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

