// Import necessary Node.js files
const db = require('../../models');

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

// Let's generate a group invite and attach the user UUID as its guest user UUID for them to use to log back in with
router.post("/auth/quickstart/register", function (req, res) {
	// Create a new user with only a UUID which is used for QuickStart users
	db.Users.create({})
	.then(function (newUser) {
		// Create a group invite using a non-existent group. Also, have it already approved and attached to the User requesting this
		db.GroupInvites.create({
			group_uuid: 'quickstart',
			guest_user_uuid: newUser.dataValues.user_uuid,
			accepted: true,
		})
		.then(function (groupInvite) {
			//create new session property "user", set equal to logged in user
			req.session.user = { id: newUser.dataValues.id, user_uuid: newUser.dataValues.user_uuid }
			req.session.error = null;

			// Send the group invite back to the requester along with the user
			res.status(200).json({
				user: newUser.dataValues,
				invite: groupInvite,
			});
		})
		.catch(function (error) {
			console.log(error);
			req.session.user = false;
			req.session.error = 'Server encountered error when registering user!';
			res.status(500).send('Server encountered error when registering user!');
		});
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
