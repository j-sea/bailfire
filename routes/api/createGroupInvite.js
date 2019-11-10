// Import necessary Node.js files
const db = require('../../models');

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

router.post("/api/group-invite", function (req, res) {
	//any user with auth session can create group
	if (req.session.user) {
		// Let's generate a group invite they can send someone who will then have a guest user created for them when they accept the invite
		if (Object.prototype.hasOwnProperty.call(req.body, 'group_uuid')) {
			// Find the group
			db.Groups.findOne({
				where: {
					id: req.body.group_uuid
				}
			}).then(function(group){
				// Check if the logged in user is the admin of the group
				if (group.UserId === req.session.user.id) {
					// Create a new group invite
					db.GroupInvites.create({
						group_uuid: req.body.group_uuid
					})
					.then(function (groupInvite) {
						// Send the group invite back to the requester
						res.status(200).json(groupInvite);
					})
					.catch(function (error) {
						console.log(error);
						res.status(500).send('Failed to create group invite');
					});
				}
				else {
					res.status(401).send('Please log in first.');
				}
			})
			.catch(function (error) {
				console.log(error);
				res.status(500).send('Failed to create group invite');
			});
		}
		else {
			res.status(500).send('Attempt to create group invite unsuccessful')
		}
	}
	else {
		res.status(401).send('Please log in first.')
	}
});

// Export these routers
module.exports = router;

