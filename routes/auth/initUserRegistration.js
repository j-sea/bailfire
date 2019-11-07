require('dotenv').config();

// Import necessary Node.js files
const db = require('../../models');

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

router.post("/auth/register", function(req, res) {
	const newUserData = { ...req.body };

	if (Object.prototype.hasOwnProperty.call(newUserData, 'phone') && newUserData.phone !== '') {
		newUserData.phone = parseInt(newUserData.phone);
	}

	if (Object.prototype.hasOwnProperty.call(newUserData, 'password')) {
		if (Object.prototype.hasOwnProperty.call(newUserData, 'email') || Object.prototype.hasOwnProperty.call(newUserData, 'phone')) {
			if (newUserData.password !== '' && newUserData.email !== '' && newUserData.phone !== '') {
				db.Users.create(newUserData)
				.then(function (newUser) {
					console.log(newUser);
					//create new session property "user", set equal to logged in user
					req.session.user = { id: newUser.id, email: newUser.email, phone: newUser.phone, user_uuid: newUser.user_uuid }
					req.session.error = null;
					res.status(200).json(req.session);
				})
				.catch(function (error) {
					console.log(error);
					req.session.user = false;
					req.session.error = 'Server encountered error when registering user!';
					res.status(500).send('Server encountered error when registering user!');
				});
			}
			else {
				console.log('Having blank password and email/phone is invalid.')
				req.session.user = false;
				req.session.error = 'Server encountered error when registering user!';
				res.status(500).send('Server encountered error when registering user!');
			}
		}
		else {
			console.log('Providing a password and no email or phone is invalid')
			req.session.user = false;
			req.session.error = 'Server encountered error when registering user!';
			res.status(500).send('Server encountered error when registering user!');
		}
	}
	else {
		if (!Object.prototype.hasOwnProperty.call(newUserData, 'email') && !Object.prototype.hasOwnProperty.call(newUserData, 'phone')) {
			db.Users.create(newUserData)
			.then(function (newUser) {
				//create new session property "user", set equal to logged in user
				req.session.user = { id: newUser.id, email: newUser.email, phone: newUser.phone, user_uuid: newUser.user_uuid }
				req.session.error = null;
				res.status(200).json(req.session);
			})
			.catch(function (error) {
				console.log(error);
				req.session.user = false;
				req.session.error = 'Server encountered error when registering user!';
				res.status(500).send('Server encountered error when registering user!');
			});
		}
		else {
			console.log('Providing an email or phone with no password is invalid')
			req.session.user = false;
			req.session.error = 'Server encountered error when registering user!';
			res.status(500).send('Server encountered error when registering user!');
		}
	}
});

// Export these routers
module.exports = router;