const jwt = require('jsonwebtoken');
require('dotenv').config();

// Import necessary Node.js files
const bcrypt = require('bcrypt');
const db = require('../../models');

// Create an Express Router to allow routing via files external to server.js
const router = require('express').Router();

router.post("/auth/login", function(req, res) {
	db.Users.findOne({
		where: {
			email: req.body.email,
		}
	})
	.then(function (dbUser) {

		const authorizedOrigins = [
			'http://localhost:3000',
			'https://scatter-web.herokuapp.com',
		];
		
		if (dbUser
			&& bcrypt.compareSync(req.body.password, dbUser.password)
			&& authorizedOrigins.indexOf(req.headers.origin) !== -1) {

			const expiresIn = 1 * 24 * 60 * 60; // One day
			const accessToken = jwt.sign({ id: dbUser.id }, process.env.JWT_SECRET_KEY, {
				expiresIn: expiresIn
			});

			// jwt.verify(accessToken, process.env.JWT_SECRET_KEY, function(err, decoded) {
			// 	if (err) {
			// 		console.log('ERR: ' + err);
			// 	}
			// 	else {
			// 		console.log('DEC: ' + JSON.stringify(decoded));
			// 	}
			// });

			// Clear the hashed password before we send the user info
			dbUser.password = null;

			if (req.headers.origin === 'http://localhost:3000') {
				res.cookie('access_token', accessToken, {
					path: '/',
					expires: new Date(Date.now() + expiresIn * 1000),
					httpOnly: true,
				});
			}
			else {
				res.cookie('access_token', accessToken, {
					// domain: req.headers.origin,
					path: '/',
					expires: new Date(Date.now() + expiresIn * 1000),
					httpOnly: true,
					// secure: true,
				});
			}

			res.status(200).send({
				user: dbUser
			});
		}
		else {
			res.status(401).send('Login credentials invalid!');
		}
	})
	.catch(function (error) {
		console.log(error);
		res.status(500).send('Encountered server error when logging in!');
	});
});

// Export these routers
module.exports = router;