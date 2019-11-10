// Import necessary Node.js files
const db = require('../../models');

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

router.put("/api/group-invite", function (req, res) {
	// Let's update the invite which will update the related group's page
	if (Object.prototype.hasOwnProperty.call(req.body, 'invite_uuid')) {
		// Find the group invite
		db.GroupInvites.update(req.body, {
			where: {
				invite_uuid: req.body.invite_uuid,
			}
		}).then(function(groupInvite){
			// If there was only one update
			if (groupInvite[0] === 1) {
				// Send the updated group invite UUID back to the requester
				res.status(200).json({
					invite_uuid: req.body.invite_uuid
				});
			}
			else {
				// There should only be one result with that invite_uuid
				res.status(500).send('Attempt to update group invite unsuccessful');
			}
		})
		.catch(function (error) {
			console.log(error);
			res.status(500).send('Attempt to update group invite unsuccessful');
		});
	}
	else {
		res.status(500).send('Attempt to update group invite unsuccessful')
	}
});

// Export these routers
module.exports = router;

