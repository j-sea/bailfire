// Import necessary Node.js files
const db = require('../../models');

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

// Retrieve a guest user that hasn't upgraded into a full user yet
router.post("/auth/login/guest", function (req, res) {
	// Find the group invite related to this guest
	db.GroupInvites.findOne({
		where: {
			invite_uuid: req.body.invite_uuid,
		}
	})
	.then(function (invite) {
		// Find the user related to this group invite
		db.Users.findOne({
			where: {
				user_uuid: invite.guest_user_uuid,
			}
		})
		.then(function (guestUser) {
			// Check if the user is actually a QuickStart user
			if (guestUser.email === null && guestUser.phone === null && guestUser.password === null) {
				req.session.user = { id: guestUser.id, user_uuid: guestUser.user_uuid }
				req.session.error = null;
				res.status(200).send({user: req.session.user});
			}
			// This isn't a Guest user, deny login
			else {
				req.session.user = false;
				req.session.error = 'Server encountered error when loading guest user!';
				res.status(500).send('Server encountered error when loading guest user!');
			}
		})
		.catch(function (error) {
			console.log(error);
			req.session.user = false;
			req.session.error = 'Server encountered error when loading guest user!';
			res.status(500).send('Server encountered error when loading guest user!');
		});
	})
	.catch(function (error) {
		console.log(error);
		req.session.user = false;
		req.session.error = 'Server encountered error when loading guest user!';
		res.status(500).send('Server encountered error when loading guest user!');
	})
});

// Export these routers
module.exports = router;
