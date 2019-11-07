// const jwt = require('jsonwebtoken');
require('dotenv').config();

// Import necessary Node.js files
const bcrypt = require('bcrypt');
const db = require('../../models');
const {Op} = require('sequelize');

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

router.post("/auth/login", function (req, res) {
	console.log('logging in');
	if (!Object.prototype.hasOwnProperty.call(req.body, 'phone') || typeof req.body.phone !== 'string' || req.body.phone === '') {
		req.body.phone = 0;
	}
	else {
		req.body.phone = parseInt(req.body.phone);
	}

	if (!Object.prototype.hasOwnProperty.call(req.body, 'email') || typeof req.body.email !== 'string') {
		req.body.email = '';
	}

	if (!Object.prototype.hasOwnProperty.call(req.body, 'password') || typeof req.body.password !== 'string') {
		req.body.password = '';
	}
	
	if (req.body.password !== '' && (req.body.email !== '' || req.body.phone !== '')) {
		db.Users.findOne({
			where: {
				[Op.or]: [
					{
						email: req.body.email,
					},
					{
						phone: req.body.phone,
					},
				],
			},
		})
		.then(function (dbUser) {
			if (!dbUser) {
				res.status(401).send('Login credentials incorrect!');
			}
			else {
				if (bcrypt.compareSync(req.body.password, dbUser.password)) {
					//create new session property "user", set equal to logged in user
					req.session.user = { id: dbUser.id, email: dbUser.email, phone: dbUser.phone, user_uuid: dbUser.user_uuid }
					req.session.error = null;
					res.status(200).json(req.session);
				}
				else {
					//delete existing user, add error
					req.session.user = false;
					req.session.error = 'Login credentials incorrect!';
					res.status(401).send("Login credentials incorrect!");
				}
			}
		})
		.catch(function (error) {
			console.log(error);
			res.status(500).send('Encountered server error when logging in!');
		});
	}
	else {
		//delete existing user, add error
		req.session.user = false;
		req.session.error = 'Login credentials incorrect!';
		res.status(401).send("Login credentials incorrect!");
	}
});

// Export these routers
module.exports = router;