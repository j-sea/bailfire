// Import necessary Node.js files
const db = require('../../models');

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

router.post("/api/group-invite", function (req, res) {
	//any user with auth session can create group
	if (req.session.user) {
		if (Object.prototype.hasOwnProperty.call(req.body, 'group_uuid')) {
			db.Groups.findOne({
				where: {
					id: req.body.group_uuid
				}
			}).then(function(group){
				if (group.UserId === req.session.user.id) {
					db.GroupInvites.create({
						group_uuid: req.body.group_uuid
					})
					.then(function (groupInvite) {
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
		else if (Object.prototype.hasOwnProperty.call(req.session.user, 'user_uuid')) {
			db.GroupInvites.create({
				guest_user_uuid: req.session.user.user_uuid,
				approved: true,
			})
			.then(function (groupInvite) {
				res.status(200).json(groupInvite);
			})
			.catch(function (error) {
				console.log(error);
				res.status(500).send('Failed to create group invite');
			});
		}
		else {
			res.status(500).send('Attempt to create group invite unsuccessful')
		}
	} else {
		res.status(401).send('Please log in first.')
	}
});

// Export these routers
module.exports = router;

