// Import necessary Node.js files
const db = require('../../models');

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

router.post("/api/group", function (req, res) {
	//any user with auth session can create group
	if (req.session.user) {
		//splice creates copy of Group
		let newGroup = { ...req.body };

		// Add new column to table for the admin user assocation
		newGroup.UserId = req.session.user.id

		// Create the group
		db.Groups.create(newGroup)
		// If successful
		.then(function (dbGroup) {
			// Grab a random color for the user
			const randomColor = "#000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
			
			// Set up and link user details for the admin
			db.GroupUserDetails.create({
				group_uuid: dbGroup.group_uuid,
				user_uuid: req.session.user.user_uuid,
				color: randomColor,
				name: 'Admin',
				description: 'Admin of group',
			})
			.then(function () {
				// sends success status for the group creation
				res.status(200).send(dbGroup);
			})
			.catch(function (error) {
				console.log(error);
				res.status(500).send('Server encountered error when creating group user details.');
			});
		})
		//if not sucessful, will catch error to inform user
		.catch(function (err) {
			console.log(err);
			res.status(500).send('Attempt to create group unsuccessful')

		});
	} else {
		res.status(401).send('Please log in first.')
	}

});

// Export these routers
module.exports = router;

