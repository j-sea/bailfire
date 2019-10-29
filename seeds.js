'use strict';

const bcrypt = require('bcrypt');
const db = require('./models');

module.exports = () => {
	return db.Users.bulkCreate([
		{
			email: 'a@a.com',
			password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
			createdAt: '2019-10-25 23:56:43',
			updatedAt: '2019-10-25 23:56:43',
		},
		{
			email: 'b@b.com',
			password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
			createdAt: '2019-10-25 23:56:43',
			updatedAt: '2019-10-25 23:56:43',
		},
		{
			email: 'c@c.com',
			password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
			createdAt: '2019-10-25 23:56:43',
			updatedAt: '2019-10-25 23:56:43',
		},
		{
			email: 'd@d.com',
			password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
			createdAt: '2019-10-25 23:56:43',
			updatedAt: '2019-10-25 23:56:43',
		},
	]);
};